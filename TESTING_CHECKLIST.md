# ShonaliChain - Testing Checklist ✅

## Pre-Launch Testing

### Smart Contract Tests

#### 1. User Registration
- [ ] Register as Farmer with Bangla name
- [ ] Register with Bogura location
- [ ] Register with Munshiganj location
- [ ] Try duplicate registration (should fail)
- [ ] Register without name (should fail)

#### 2. Harvest Minting
- [ ] Mint Jute batch (5000 KG, ৳45/KG)
- [ ] Mint Potato batch (3000 KG, ৳30/KG)
- [ ] Try minting without registration (should fail)
- [ ] Try minting with 0 quantity (should fail)
- [ ] Verify batch counter increments

#### 3. Movement Tracking
- [ ] Check initial movement recorded on mint
- [ ] Transfer batch to another user
- [ ] Verify movement array updated
- [ ] Get movement count
- [ ] Get all batch movements

#### 4. Anti-Hoarding Logic
- [ ] Mint new batch
- [ ] Check status immediately (should be false)
- [ ] Fast-forward 3 days (in test)
- [ ] Check status again (should be true)
- [ ] Verify timestamp updates on transfer

#### 5. Escrow System
- [ ] Create escrow with exact price
- [ ] Try creating escrow with insufficient funds (should fail)
- [ ] Try buying own batch (should fail)
- [ ] Confirm receipt as buyer
- [ ] Verify funds transferred to seller
- [ ] Cancel escrow and verify refund

---

## Frontend Tests

### Page Load Tests
- [ ] Homepage loads without errors
- [ ] Farmer dashboard loads
- [ ] Wholesaler dashboard loads
- [ ] Consumer dashboard loads
- [ ] All Bangla text renders correctly

### Farmer Dashboard
- [ ] Registration form displays
- [ ] District dropdown populates
- [ ] Location dropdown filters by district
- [ ] Form validation works
- [ ] Crop type icons display
- [ ] Harvest minting form submits
- [ ] Batch history updates
- [ ] Total price calculated correctly

### Wholesaler Dashboard
- [ ] Available batches display
- [ ] Crop icons render
- [ ] Hoarding indicators work (green/red)
- [ ] Price calculations correct
- [ ] Escrow button functional
- [ ] Purchase confirmation dialog
- [ ] My purchases section updates
- [ ] Confirm receipt button works

### Consumer Dashboard
- [ ] Search input functional
- [ ] QR scanner button works
- [ ] Scanning animation displays
- [ ] Batch details load correctly
- [ ] Product verification badge shows
- [ ] Timeline component renders
- [ ] All movement steps display
- [ ] Locations in Bangla/English
- [ ] Timestamps formatted correctly

---

## Timeline Component Tests

### Visual Tests
- [ ] Vertical line displays (green gradient)
- [ ] Checkmark icons for completed steps
- [ ] Circle icons for incomplete steps
- [ ] Handler names display
- [ ] Locations display with MapPin icon
- [ ] Timestamps formatted in Bangla
- [ ] Role labels display correctly
- [ ] Hover effects work
- [ ] Responsive on mobile

### Data Tests
- [ ] Accepts array of steps
- [ ] Handles empty array gracefully
- [ ] Displays 4+ steps correctly
- [ ] Completed vs incomplete states
- [ ] Timestamp conversion (unix → readable)

---

## Wallet Integration Tests

### Connection
- [ ] Connect Wallet button displays
- [ ] MetaMask connection works
- [ ] WalletConnect works
- [ ] Account address displays
- [ ] Disconnect works
- [ ] Network switch prompt (if not localhost)

### Transactions
- [ ] Sign transaction prompt appears
- [ ] Transaction confirmation works
- [ ] Error handling for rejected tx
- [ ] Loading states during tx
- [ ] Success messages after tx

---

## Responsive Design Tests

### Mobile (375px)
- [ ] Navigation accessible
- [ ] Forms stack vertically
- [ ] Buttons full-width
- [ ] Timeline readable
- [ ] Text sizes appropriate
- [ ] No horizontal scroll

### Tablet (768px)
- [ ] Grid layouts 2 columns
- [ ] Dashboard cards display well
- [ ] Timeline centered

### Desktop (1920px)
- [ ] Max-width containers centered
- [ ] Large text readable
- [ ] Grid layouts 3 columns
- [ ] Plenty of whitespace

---

## Cross-Browser Tests

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if available)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Performance Tests

- [ ] Page load < 3 seconds
- [ ] No console errors
- [ ] No console warnings (acceptable: WalletConnect init)
- [ ] Images load properly
- [ ] Animations smooth (60fps)
- [ ] No memory leaks

---

## Accessibility Tests

### Keyboard Navigation
- [ ] Tab through forms
- [ ] Enter submits forms
- [ ] Esc closes dialogs
- [ ] Focus indicators visible

### Screen Reader
- [ ] Page title read correctly
- [ ] Buttons labeled
- [ ] Form inputs labeled
- [ ] Error messages announced

### Color Contrast
- [ ] Text readable on backgrounds
- [ ] Buttons have sufficient contrast
- [ ] Links distinguishable

---

## Data Validation Tests

### Form Inputs
- [ ] Required fields enforced
- [ ] Number inputs reject text
- [ ] Quantity must be > 0
- [ ] Price must be > 0
- [ ] Location required after district

### Batch Data
- [ ] IDs are unique
- [ ] Timestamps valid
- [ ] Addresses checksummed
- [ ] Crop types match enum

---

## Edge Cases

### Empty States
- [ ] No batches registered
- [ ] No purchases made
- [ ] No movements yet
- [ ] Search returns nothing

### Error States
- [ ] Network disconnected
- [ ] Transaction failed
- [ ] Invalid batch ID
- [ ] Wallet locked

### Boundary Values
- [ ] Batch ID 0
- [ ] Quantity = 1
- [ ] Price = 1 wei
- [ ] Max uint256 values

---

## Security Tests

### Contract Security
- [ ] Only owner can call owner functions
- [ ] Only batch owner can transfer
- [ ] Only buyer can confirm receipt
- [ ] Reentrancy protection
- [ ] Integer overflow protection (Solidity 0.8+)

### Frontend Security
- [ ] XSS prevention (React escapes)
- [ ] CSRF protection
- [ ] Input sanitization
- [ ] Safe Math operations

---

## Integration Tests

### End-to-End Flow
1. [ ] Farmer registers
2. [ ] Farmer mints harvest
3. [ ] Wholesaler views batch
4. [ ] Wholesaler creates escrow
5. [ ] Farmer sees escrow
6. [ ] Wholesaler confirms receipt
7. [ ] Farmer receives payment
8. [ ] Consumer traces batch
9. [ ] Consumer sees full timeline
10. [ ] All movements recorded

### Multi-User Flow
1. [ ] User A mints batch
2. [ ] User B buys batch
3. [ ] User B transfers to User C
4. [ ] User C transfers to User D
5. [ ] Timeline shows 4 movements
6. [ ] All handlers recorded

---

## Demo Rehearsal

### Timing
- [ ] Complete demo in < 5 minutes
- [ ] Each section < 60 seconds
- [ ] Timeline reveal is impactful
- [ ] No awkward pauses

### Narration
- [ ] Problem statement clear
- [ ] Technical terms explained
- [ ] Bangla terms pronounced correctly
- [ ] Confidence in delivery

### Backup Plans
- [ ] Screenshots ready
- [ ] Contract code open
- [ ] Video recording available
- [ ] Localhost fallback

---

## Final Checks

### Before Presentation
- [ ] Hardhat node running
- [ ] Contract deployed
- [ ] Frontend running
- [ ] MetaMask connected
- [ ] Browser in full screen
- [ ] Demo data prepared
- [ ] Backup device ready

### Documentation
- [ ] IMPLEMENTATION_SUMMARY.md complete
- [ ] DEMO_GUIDE.md printed
- [ ] README.md updated
- [ ] Code comments clear
- [ ] LICENSE file present

### Repository
- [ ] All files committed
- [ ] .gitignore configured
- [ ] node_modules excluded
- [ ] README instructions tested
- [ ] No sensitive data committed

---

## Known Issues (To Address)

### Minor Issues
- [ ] WalletConnect init warning (harmless)
- [ ] Multiple Lit versions warning (harmless)
- [ ] SWC minifier deprecation (Next.js)

### Future Enhancements
- [ ] Real QR code generation
- [ ] IPFS for images
- [ ] Chart.js integration
- [ ] Email notifications
- [ ] Polygon Mumbai deployment

---

## Success Criteria

### Must Have ✅
- [x] Contract compiles
- [x] Contract deployed
- [x] Frontend runs
- [x] All dashboards functional
- [x] Timeline displays
- [x] Bangla text works
- [x] Mock data present

### Nice to Have ⭐
- [ ] Real wallet transactions
- [ ] Actual QR scanning
- [ ] Price charts
- [ ] Export data
- [ ] Print timeline

---

## Post-Hackathon TODO

### Immediate (Week 1)
- [ ] Deploy to Polygon Mumbai
- [ ] Real QR code integration
- [ ] User feedback collection
- [ ] Bug fixes

### Short-term (Month 1)
- [ ] Pilot with 10 farmers
- [ ] IoT sensor integration
- [ ] Mobile app (React Native)
- [ ] Admin dashboard

### Long-term (Quarter 1)
- [ ] 100+ farmer onboarding
- [ ] Government partnership
- [ ] NGO collaboration
- [ ] Mainnet deployment

---

## Contact for Issues

**Project Lead**: [Your Name]
**Email**: [Your Email]
**GitHub**: [Repository URL]

---

## Notes

- Keep `DEMO_GUIDE.md` open during presentation
- Have `IMPLEMENTATION_SUMMARY.md` ready for judges
- Smile and be confident! 😊
- Your solution solves a real problem
- The timeline is your secret weapon 🎯

Good luck! 🚀🌾
