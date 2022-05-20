// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract etherTranscation {
    uint256 public balance;

    mapping(address => uint256) balanceMapping;

    struct users {
        address userAddress;
        uint256 userBalance;
    }

    struct transcations {
        address from;
        address to;
        uint256 transferBalance;
    }

    function bankBalance() public view returns (uint256) {
        return balanceMapping[msg.sender];
    }

    function walletToBankTransfer() public payable returns (string memory) {
        require(
            msg.value > 100000 gwei,
            "Amount must be greater than 100000 Gwei"
        );
        // require( >= _amount, "Insufficient funds");
        // (bool sent,)=address(this).call{value:msg.value}("");
        // require(sent, "Transcation is Failed");

        balanceMapping[msg.sender] += msg.value;
        // return("Successfully transferred the value %d", msg.value);
        return ("Successfully Deposite the Amount");
    }

    function bankToWalletTransfer(uint256 _withdraw)
        public
        returns (string memory)
    {
        require(
            _withdraw < balanceMapping[msg.sender],
            "Insufficent balance to withdraw"
        );
        require(
            _withdraw > 100000 gwei,
            "Amount must be greater than 100000 Gwei"
        );

        address payable person = payable(msg.sender);
        (bool sent, ) = person.call{value: _withdraw}("");
        require(sent, "Transcation is Failed");

        balanceMapping[msg.sender] -= _withdraw;
        // return("Successfully transferred the value %d", msg.value);
        return ("Successfully Withdraw the Amount");
    }

    function walletToWalletTransfer(address _toAddress)
        public
        payable
        returns (string memory)
    {
        (bool sent, ) = _toAddress.call{value: msg.value}("");
        require(sent, "Transcation is Failed");

        return ("Successfully Transefered");
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
