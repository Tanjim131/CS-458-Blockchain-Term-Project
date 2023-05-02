
pragma solidity >=0.7.0 <0.9.0;



contract practitioner{

    enum UserType { Patient, Practitioner }
    enum AccessType { Read, Write }

    //Custom Errors
    error DoNotHaveAccess();


    //personal info structure
    struct PersonalInfo{
        string  name;
        string  dateOfBirth;
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
    address[] private idListPractitioner;

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
    function createPatient(string memory name, string memory dateOfBirth, string memory email, address publicKey, address addrss )public returns (PatientInfo memory){

        PatientInfo memory patientInfo = PatientInfo(PersonalInfo(name, dateOfBirth, email, addrss, publicKey), false);

        allPatientList[addrss] = patientInfo;
        idListPatient.push(addrss);
        console.log(msg.sender);
        return patientInfo;
    }

    //introduce practitioner in chain
    function createPractitioner(string memory name, string memory dateOfBirth, string memory email, 
            string memory instituteName, string memory designation, address publicKey, address addrss) private returns (PractitionerInfo memory){
        
        PractitionerInfo memory practitionerInfo = 
        PractitionerInfo(PersonalInfo(name, dateOfBirth, email, addrss, publicKey), instituteName, designation);

        allPractitionertList[addrss] = practitionerInfo;

        idListPractitioner.push(addrss);
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
    
    function authorizeUser(address patractitioner, address patient)  private  {
        deleteFromPendingList(patractitioner, patient);
        authorizedPractitionersMap[patient][patractitioner] = allPractitionertList[patractitioner];
    }

    function denyUser(address patractitioner, address patient)  private  {
        deleteFromPendingList(patractitioner, patient);
    }

    function deleteFromPendingList(address practitioner, address patient) private {
        delete pendingReqPtractitionersMap[patient][practitioner]; 
    }
    
    function revokeAccess(address practitioner, address patient) private {
        delete authorizedPractitionersMap[patient][practitioner];
    }

    
    function getPendingUserList(address patient) public view returns( PractitionerInfo[] memory) {
       uint256 len = idListPractitioner.length;
        PractitionerInfo[] memory practitioners = new PractitionerInfo[](len);

        for (uint256 i = 0; i < len; i++) {
            address practitioner = idListPractitioner[i];
            if (pendingReqPtractitionersMap[patient][practitioner].personalInfo.addrss != address(0)) {
            practitioners[i] = pendingReqPtractitionersMap[patient][practitioner];
            }
        }

        return (practitioners);
    }

    function getAuthUserList(address patient) public view returns( PractitionerInfo[] memory) {
        uint256 len = idListPractitioner.length;
        PractitionerInfo[] memory practitioners = new PractitionerInfo[](len);

        for (uint256 i = 0; i < len; i++) {
            address practitioner = idListPractitioner[i];
            if (authorizedPractitionersMap[patient][practitioner].personalInfo.addrss != address(0)) {
            practitioners[i] = authorizedPractitionersMap[patient][practitioner];
            }
        }

        return (practitioners);
    }
    
    //get pending practitioner 
    function getAccessiblePatientList(address practitioner) private view returns(PatientInfo[] memory) {
        uint256 len = idListPatient.length;
        PatientInfo[] memory patientInfos = new PatientInfo[](len);

        for (uint256 i = 0; i < len; i++) {
            address patient = idListPatient[i];
            if (accessiblePatientsMap[practitioner][patient].personalInfo.addrss != address(0)) {
            patientInfos[i] = accessiblePatientsMap[practitioner][patient];
            }
        }

        return (patientInfos);
    }
    


    function requestPermission(address patient, address practitioner) private  {
        pendingReqPtractitionersMap[patient][practitioner] = allPractitionertList[practitioner] ;
    }


}
