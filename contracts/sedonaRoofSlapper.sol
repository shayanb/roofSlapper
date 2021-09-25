pragma solidity 0.8.7;
/*
  ______   __                   ________  __                   __      _______                        ______  
 /      \ |  \                 |        \|  \                 |  \    |       \                      /      \ 
|  $$$$$$\| $$  ______    ______\$$$$$$$$| $$____    ______  _| $$_   | $$$$$$$\  ______    ______  |  $$$$$$\
| $$___\$$| $$ |      \  /      \ | $$   | $$    \  |      \|   $$ \  | $$__| $$ /      \  /      \ | $$_  \$$
 \$$    \ | $$  \$$$$$$\|  $$$$$$\| $$   | $$$$$$$\  \$$$$$$\\$$$$$$  | $$    $$|  $$$$$$\|  $$$$$$\| $$ \    
 _\$$$$$$\| $$ /      $$| $$  | $$| $$   | $$  | $$ /      $$ | $$ __ | $$$$$$$\| $$  | $$| $$  | $$| $$$$    
|  \__| $$| $$|  $$$$$$$| $$__/ $$| $$   | $$  | $$|  $$$$$$$ | $$|  \| $$  | $$| $$__/ $$| $$__/ $$| $$      
 \$$    $$| $$ \$$    $$| $$    $$| $$   | $$  | $$ \$$    $$  \$$  $$| $$  | $$ \$$    $$ \$$    $$| $$      
  \$$$$$$  \$$  \$$$$$$$| $$$$$$$  \$$    \$$   \$$  \$$$$$$$   \$$$$  \$$   \$$  \$$$$$$   \$$$$$$  \$$      
                        | $$                                                                                  
                        | $$                                                                                  
                         \$$            V2                                                                      
*/

interface IKiaSedona  {
   
    event RoofSlap(uint256 indexed tokenId, address indexed slapper);
    event LotURISet(uint256 lotId, string uri);

    function tokenURI(uint256 tokenId) external returns (string memory);
    function roofSlap(uint256 tokenId) external ;
    function mint(uint256 quantity) external ;
}


contract sedonaRoofSlapper {
    
    address public constant DONA_CONTRACT = 0xF210D5d9DCF958803C286A6f8E278e4aC78e136E;
    address JayPegsCanadaBranch = 0xACFb3cE6bc126A50bEc71CC9b09CCA059e0D27Bd;
    
    function SlapThatRoof(uint256 _tokenId, uint8 slaps) public {
        for(uint8 i = 0; i < slaps; i++) {
            IKiaSedona(DONA_CONTRACT).roofSlap(_tokenId);
        }
    }
    
     function SlapThoseRoofs(uint256[] memory _tokenIds, uint8 slaps) public {
        for (uint j = 0; j < _tokenIds.length; j++)
            for(uint8 i = 0; i < slaps; i++) {
                IKiaSedona(DONA_CONTRACT).roofSlap(_tokenIds[j]);
             }  
         }

    
    function SlapRandomRoof(uint8 slaps) public {
        uint256 tokenId = uint256(blockhash(block.number - 1)) / 10000;
        for(uint8 i = 0; i < slaps; i++) {
            IKiaSedona(DONA_CONTRACT).roofSlap(tokenId);
        }
    }
    
    
    fallback() payable external {
        payable(JayPegsCanadaBranch).transfer(msg.value); // sorry if you sent ether to this address. We'll put it toward a land yacht
    }
    
    receive() external payable {
        payable(JayPegsCanadaBranch).transfer(msg.value); // sorry if you sent ether to this address. We'll put it toward a land yacht
    }
    
}






