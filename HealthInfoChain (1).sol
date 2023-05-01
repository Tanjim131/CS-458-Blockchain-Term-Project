
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
//import "ipfs://<hash>/path/to/file";

contract practitioner{

    enum UserType { Patient, Practitioner }
    enum AccessType { Read, Write }

    //Custom Errors
    error DoNotHaveAccess();


    //personal info structure
    struct PersonalInfo{
        bytes32 id;
        string  name;
        uint256  dateOfBirth;
        string  email;
        address addrss;
        address publicKey;
    }

    struct PatientInfo{
        PersonalInfo personalInfo;
        bool isRecStored;
    }

    struct PractitionerInfo{
        PersonalInfo personalInfo;
        string instituteName;
        string designation;
    }


    mapping(address => bytes32) private patientRecHash;

    // total count
    mapping(address=> PatientInfo ) private allPatientList;
    mapping(address=> PractitionerInfo ) private allPractitionertList;
    address[] private idListPatient;

    //patient end counts
    mapping(address=> mapping(address => PractitionerInfo) ) private authorizedPractitionersMap;
    mapping(address=> mapping(address => PractitionerInfo) ) private pendingReqPtractitionersMap;
    //mapping(address => address[]) private authorizedPractitioners;
    //mapping(address => address[]) private pendingReqPtractitioners;

    //practitioner end counts
    mapping(address=> mapping(address => PatientInfo) ) private accessiblePatientsMap;
    //mapping(address => address[]) private accessiblePatients;

    //generate Id
    function generateId(bytes memory data) internal returns (bytes32) {
        return keccak256(abi.encodePacked(block.difficulty , block.timestamp ,data));
    }

    function savePatientHash(bytes32 hash) public {
        //require(msg.value >= price, "Not enough Ether sent.");
        patientRecHash[msg.sender] = hash;
    }
    //introduce patient in chain
    function createPatient(string memory name, uint256  dateOfBirth, string memory email, address publicKey)private returns (PatientInfo memory){
        
        PersonalInfo memory personalInfo = PersonalInfo(generateId("data"), name, dateOfBirth, email, msg.sender, publicKey);
        PatientInfo memory patientInfo = PatientInfo(personalInfo, false);
 
        allPatientList[msg.sender] = patientInfo;
        idListPatient.push(msg.sender);
        return patientInfo;
    }

    //introduce practitioner in chain
    function createPractitioner(string memory name, uint256  dateOfBirth, string memory email, 
            string memory instituteName, string memory designation, address publicKey) private returns (PractitionerInfo memory){
        
        PersonalInfo memory personalInfo = PersonalInfo(generateId("data"), name, dateOfBirth, email, msg.sender, publicKey);
        PractitionerInfo memory practitionerInfo = PractitionerInfo(personalInfo, instituteName, designation);

        allPractitionertList[msg.sender] = practitionerInfo;
        return practitionerInfo;
    }


    // Check if practitioner has access
    function isAuthorized(address practitionerAddr, address patientId) public view returns(bool) {
        // Check if practitioner id is valid
        if(allPractitionertList[practitionerAddr].personalInfo.addrss != address(0)){
            // Check if patient has authorized that practitioner
            if(authorizedPractitionersMap[patientId][practitionerAddr].personalInfo.addrss 
            != address(0)){
                return true;
            }
        }
        return false;
    }
    
    function authorizeUser(address patractitioner)  private  {
        deleteFromPendingList(patractitioner);
        authorizedPractitionersMap[msg.sender][patractitioner] = allPractitionertList[patractitioner];
    }

    function denyUser(address patractitioner)  private  {
        deleteFromPendingList(patractitioner);
    }

    function deleteFromPendingList(address practitioner) private {
        delete pendingReqPtractitionersMap[msg.sender][practitioner]; 
    }
    
    function revokeAccess(address practitioner) private {
        delete authorizedPractitionersMap[msg.sender][practitioner];
    }


    function getPendingUserList() public view returns( PractitionerInfo[] memory) {
        uint256 len = idListPatient.length;
        PractitionerInfo[] memory practitioners = new PractitionerInfo[](len);

        for (uint256 i = 0; i < len; i++) {
            address patient = idListPatient[i];
            if (pendingReqPtractitionersMap[patient][msg.sender].personalInfo.addrss != address(0)) {
            practitioners[i] = pendingReqPtractitionersMap[patient][msg.sender];
            }
        }

        return (practitioners);
    }

    function getAuthUserList() public view returns( PractitionerInfo[] memory) {
        uint256 len = idListPatient.length;
        PractitionerInfo[] memory practitioners = new PractitionerInfo[](len);

        for (uint256 i = 0; i < len; i++) {
            address patient = idListPatient[i];
            if (pendingReqPtractitionersMap[patient][msg.sender].personalInfo.addrss != address(0)) {
            practitioners[i] = pendingReqPtractitionersMap[patient][msg.sender];
            }
        }

        return (practitioners);
    }
    
    //get pending practitioner 
    /*function getAccessiblePatientList() private view returns(PatientInfo[] memory) {
        
        return accessiblePatientsMap(msg.sender);
    }
    */


    function requestPermission(address patient) private  {
        pendingReqPtractitionersMap[patient][msg.sender] = allPractitionertList[msg.sender] ;
    }


}
