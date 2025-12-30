// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ShonaliChain
 * @dev Supply chain tracking contract for agricultural products (Jute/Potato)
 */
contract ShonaliChain is Ownable {
    
    // Enums
    enum Role { Farmer, Transporter, Wholesaler, Retailer }
    
    // Structs
    struct User {
        string name;
        string location;
        Role role;
        uint256 reputationScore;
        bool isRegistered;
    }
    
    struct Batch {
        uint256 id;
        address producer;
        string cropType;
        uint256 quantity;
        address currentHandler;
        uint256 price;
        bool isSold;
        uint256 timestamp;
    }
    
    // State Variables
    mapping(address => User) public users;
    mapping(uint256 => Batch) public batches;
    mapping(uint256 => address) public batchEscrow; // Holds buyer's address during transaction
    mapping(uint256 => uint256) public escrowAmount; // Holds payment amount
    
    uint256 public batchCounter;
    
    // Events
    event UserRegistered(address indexed userAddress, string name, Role role);
    event HarvestMinted(uint256 indexed batchId, address indexed producer, string cropType, uint256 quantity, uint256 timestamp);
    event OwnershipTransferred(uint256 indexed batchId, address indexed from, address indexed to);
    event EscrowCreated(uint256 indexed batchId, address indexed buyer, uint256 amount);
    event EscrowReleased(uint256 indexed batchId, address indexed seller, uint256 amount);
    event BatchSold(uint256 indexed batchId, address indexed seller, address indexed buyer, uint256 price);
    
    // Modifiers
    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }
    
    modifier onlyBatchOwner(uint256 _batchId) {
        require(batches[_batchId].currentHandler == msg.sender, "Not the current handler");
        _;
    }
    
    modifier batchExists(uint256 _batchId) {
        require(_batchId < batchCounter, "Batch does not exist");
        _;
    }
    
    constructor() Ownable(msg.sender) {
        batchCounter = 0;
    }
    
    /**
     * @dev Register a new user in the supply chain
     * @param _name Name of the user
     * @param _location Location of the user
     * @param _role Role in the supply chain (0: Farmer, 1: Transporter, 2: Wholesaler, 3: Retailer)
     */
    function registerUser(
        string memory _name,
        string memory _location,
        Role _role
    ) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        
        users[msg.sender] = User({
            name: _name,
            location: _location,
            role: _role,
            reputationScore: 100, // Starting reputation
            isRegistered: true
        });
        
        emit UserRegistered(msg.sender, _name, _role);
    }
    
    /**
     * @dev Mint a new harvest batch (only for registered users)
     * @param _cropType Type of crop (e.g., "Jute", "Potato")
     * @param _quantity Quantity of the crop
     * @param _price Price per unit in wei
     */
    function mintHarvest(
        string memory _cropType,
        uint256 _quantity,
        uint256 _price
    ) external onlyRegistered returns (uint256) {
        require(bytes(_cropType).length > 0, "Crop type cannot be empty");
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        
        uint256 newBatchId = batchCounter;
        
        batches[newBatchId] = Batch({
            id: newBatchId,
            producer: msg.sender,
            cropType: _cropType,
            quantity: _quantity,
            currentHandler: msg.sender,
            price: _price,
            isSold: false,
            timestamp: block.timestamp
        });
        
        batchCounter++;
        
        emit HarvestMinted(newBatchId, msg.sender, _cropType, _quantity, block.timestamp);
        
        return newBatchId;
    }
    
    /**
     * @dev Transfer batch ownership to another registered user
     * @param _batchId ID of the batch to transfer
     * @param _newHandler Address of the new handler
     */
    function transferBatch(
        uint256 _batchId,
        address _newHandler
    ) external onlyRegistered onlyBatchOwner(_batchId) batchExists(_batchId) {
        require(users[_newHandler].isRegistered, "New handler not registered");
        require(!batches[_batchId].isSold, "Batch already sold");
        require(_newHandler != msg.sender, "Cannot transfer to yourself");
        
        address previousHandler = batches[_batchId].currentHandler;
        batches[_batchId].currentHandler = _newHandler;
        
        emit OwnershipTransferred(_batchId, previousHandler, _newHandler);
    }
    
    /**
     * @dev Create an escrow for a batch purchase
     * @param _batchId ID of the batch to purchase
     */
    function createEscrow(uint256 _batchId) 
        external 
        payable 
        onlyRegistered 
        batchExists(_batchId) 
    {
        require(!batches[_batchId].isSold, "Batch already sold");
        require(batches[_batchId].currentHandler != msg.sender, "Cannot buy your own batch");
        require(msg.value >= batches[_batchId].price, "Insufficient payment");
        require(batchEscrow[_batchId] == address(0), "Escrow already exists");
        
        batchEscrow[_batchId] = msg.sender;
        escrowAmount[_batchId] = msg.value;
        
        emit EscrowCreated(_batchId, msg.sender, msg.value);
    }
    
    /**
     * @dev Confirm receipt and release escrow funds
     * @param _batchId ID of the batch
     */
    function confirmReceipt(uint256 _batchId) 
        external 
        onlyRegistered 
        batchExists(_batchId) 
    {
        require(batchEscrow[_batchId] == msg.sender, "Not the buyer");
        require(!batches[_batchId].isSold, "Batch already sold");
        
        address seller = batches[_batchId].currentHandler;
        uint256 amount = escrowAmount[_batchId];
        
        // Update batch state
        batches[_batchId].currentHandler = msg.sender;
        batches[_batchId].isSold = true;
        
        // Clear escrow
        batchEscrow[_batchId] = address(0);
        escrowAmount[_batchId] = 0;
        
        // Transfer funds to seller
        payable(seller).transfer(amount);
        
        emit EscrowReleased(_batchId, seller, amount);
        emit BatchSold(_batchId, seller, msg.sender, amount);
    }
    
    /**
     * @dev Cancel escrow and refund buyer (only seller or contract owner can cancel)
     * @param _batchId ID of the batch
     */
    function cancelEscrow(uint256 _batchId) 
        external 
        batchExists(_batchId) 
    {
        require(
            batches[_batchId].currentHandler == msg.sender || owner() == msg.sender,
            "Only seller or owner can cancel"
        );
        require(batchEscrow[_batchId] != address(0), "No active escrow");
        
        address buyer = batchEscrow[_batchId];
        uint256 amount = escrowAmount[_batchId];
        
        // Clear escrow
        batchEscrow[_batchId] = address(0);
        escrowAmount[_batchId] = 0;
        
        // Refund buyer
        payable(buyer).transfer(amount);
    }
    
    /**
     * @dev Get batch details
     * @param _batchId ID of the batch
     */
    function getBatch(uint256 _batchId) 
        external 
        view 
        batchExists(_batchId) 
        returns (
            uint256 id,
            address producer,
            string memory cropType,
            uint256 quantity,
            address currentHandler,
            uint256 price,
            bool isSold,
            uint256 timestamp
        ) 
    {
        Batch memory batch = batches[_batchId];
        return (
            batch.id,
            batch.producer,
            batch.cropType,
            batch.quantity,
            batch.currentHandler,
            batch.price,
            batch.isSold,
            batch.timestamp
        );
    }
    
    /**
     * @dev Get user details
     * @param _userAddress Address of the user
     */
    function getUser(address _userAddress) 
        external 
        view 
        returns (
            string memory name,
            string memory location,
            Role role,
            uint256 reputationScore,
            bool isRegistered
        ) 
    {
        User memory user = users[_userAddress];
        return (
            user.name,
            user.location,
            user.role,
            user.reputationScore,
            user.isRegistered
        );
    }
}
