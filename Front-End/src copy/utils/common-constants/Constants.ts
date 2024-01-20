export const CoinType = {
  FREE_AO_COINS: 0,
  TUITION_COINS: 1,
  APPLICATION_COINS: 2,
  VERIFICATION_COINS: 3,
  OTHER_COINS: 4,
};

export const getCoinType = (type: number) => {
  switch (type) {
    case CoinType.FREE_AO_COINS:
      return "Free AO Coins";
    case CoinType.TUITION_COINS:
      return "Tuition Coins";
    case CoinType.APPLICATION_COINS:
      return "Application Coins";
    case CoinType.VERIFICATION_COINS:
      return "Verification Coins";
    default:
      return "Other Coins";
  }
};

export const RequestStatus = {
  INITIAL: "initial",
  INPROGRESS: "inprogress",
  OK: "ok",
  ERROR: "error",
};

export const ProgramStatus = {
  DRAFT: "draft",
  AWAITING: "awaiting",
  START: "start",
  STOPPED: "stop",
  INACTIVE: "inactive",
};
export const TransactionStatus = {
  PENDING: "Pending",
  PROCESSED: "Processed",
  FAILED: "Failed",
};

export const TransactionTypes = {
  ADD_COINS: "Add coins",
  EARN_COINS: "Earn coins",
  TRANSFER_COINS: "Transfer coins",
  SURRENDER_COINS: "Surrender coins",
};

export const FundTransferType = {
  DEBIT: "DEBIT",
  CREDIT: "CREDIT"
}

export const TransferWalletRequestStatus = {
  DRAFT: "draft",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  INVALID: "invalid",
};

export const ParticipantStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
};

export const DisbursementStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
};

export enum UserRoles {
  AO_SUPPORT_USER = "ao_support_user",
  AO_BUSINESS_USER_ALL = "ao_business_user_all",
  AO_BUSINESS_USER_REWARDS = "ao_business_user_rewards",
  AO_BUSINESS_USER_CVS = "ao_business_user_cvs",
  AO_BUSINESS_USER_APPLICATIONS = "ao_business_user_applications",
  AO_FINANCIAL_MAKER = "ao_financial_maker",
  AO_FINANCIAL_CHECKER = "ao_financial_checker",
  AO_AUTHENTICATOR = "credential_vaults_authenticator",
  STUDENT = "student",
  AGENT = "agent_admin",
  PROVIDER = "provider_admin",
}

export const onlyAoCoinsToTransfer = (sender: string, receiver: string) => {
  if (
    sender?.includes(UserRoles.STUDENT) &&
    receiver?.includes(UserRoles.PROVIDER)
  ) {
    return false;
  } else {
    return true;
  }
};

export const DEVICE_ID_COOKIE = 'device-id';

export const supportMobileNo = "+91 99123 012312";
export const supportEmail = "support@aoportal.in";

export const FaqVariables = {
  FAQ_PARENT_ID: 'faq-parent-id',
  FAQ_CATEGORY_NAME: 'faq-category-name',
};

export const activityLogEvent = {
  CREATE_DOCUMENT: "create_document",
  DELETE_DOCUMENT: "delete_document",
  SHARE_DOCUMENT: "share_document",
  UPDATE_DOCUMENT: "update_document",
  UPLOAD_DOCUMENT: "upload_document",
  DOCUMENT_APPROVAL_INITIATED: "document_approval_initiated",
  DOCUMENT_APPROVED: "document_approved",
  REMINDER_SENT: "reminder_sent",
  DOCUMENT_REJECTED: "document_rejected",
  DOCUMENT_FOLLOW_UP: "document_follow_up",
  DOCUMENT_APPROVAL_REVERTED: "document_approval_reverted",
  DOCUMENT_REJECTED_REVERTED: "document_rejection_reverted",
};


export const displayDateFormat = 'DD MMM yyyy';

export const reduceObjArrayByProperty = (arrObj = [], type: any) => {
  const filteredArr = arrObj.reduce((acc, current) => {
    const x = acc.find((item: any) => item[type] === current[type]);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return filteredArr;
};
