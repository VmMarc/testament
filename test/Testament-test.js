const { expect } = require('chai');

//Contract
describe('Testament Contract'), function () {
  let dev, owner, doctor, alice, bob, Testament, testament;
  const INIT_SUPPLY = ethers.utils.parseEther('1000000');
  const NAME = 'Testament';
  const SYMBOL = 'TSMT';
  beforeEach(async function () {
    [dev, owner, doctor, alice, bob, Testament, testament] = await ethers.getSigners();
    Testament = await ethers.getContractFactory('Testament');
    //const ethBalanceBefore = await owner.getBalance();
    testament = await Testament.connect(dev).deploy(owner.address, doctor.address);
    await testament.deployed();
  });
//Deployment
describe ('Deployment', function () {
  it(`Should have name ${NAME}`, async function () {
    expect(await testament.name()).to.equal(NAME);
  });
  it(`Should have symbol ${SYMBOL}`, async function () {
    expect(await testament.symbol()).to.equal(SYMBOL);
  });
  it(`Should have total supply ${INIT_SUPPLY.toString()}`, async function () {
    expect(await testament.totalSupply()).to.equal(INIT_SUPPLY);
  });
  it(`Should mint total supply ${INIT_SUPPLY.toString()} to owner`, async function () {
    expect(await testament.balanceOf(owner.address)).to.equal(INIT_SUPPLY);
  });
  it('Should emit Transfer at deployment', async function () {
    const receipt = await testament.deployTransaction.wait();
    const txHash = receipt.transactionHash;
    await expect(txHash).to.emit(testament, 'Transfer').withArgs(ethers.constants.AddressZero, owner.address, INIT_SUPPLY);
  });
});
}

//Function
