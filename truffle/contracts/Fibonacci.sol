// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Fibonacci {
    uint256[] fibseries;

    // n = how many in the series to return
    function generateFib(uint256 n) public {
        // set 1st and 2nd entries
        fibseries.push(1);
        fibseries.push(1);

        // generate subsequent entries
        for (uint256 i = 2; i < n; i++) {
            fibseries.push(fibseries[i - 1] + fibseries[i - 2]);
        }
    }

    function callFib(uint256 n) external pure returns (uint256) {
        if (n == 0) {
            return 0;
        }
        uint256 a = 1;
        uint256 b = 1;
        for (uint256 i = 2; i < n; i++) {
            uint256 c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}
