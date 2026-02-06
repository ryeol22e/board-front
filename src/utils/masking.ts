/**
 * 한국어 이름 마스킹
 * 예: 김철 -> 김*, 김철수 -> 김*수, 남궁철수 -> 남**수
 * @param name 이름
 */
export const maskName = (name: string): string => {
  if (!name) {
    return '';
  }

  const len = name.length;

  if (len <= 1) return name;

  if (len === 2) {
    return name.substring(0, 1) + '*';
  }

  // 3글자 이상인 경우 첫 글자와 마지막 글자를 제외하고 마스킹
  const first = name.substring(0, 1);
  const last = name.substring(len - 1, len);
  const middle = '*'.repeat(len - 2);

  return first + middle + last;
};

/**
 * 전화번호/휴대폰 번호 마스킹 (하이픈 포함 형식으로 반환)
 * 예: 010-1234-5678 -> 010-****-5678
 * 예: 02-123-4567 -> 02-***-4567
 * @param phoneNumber 전화번호
 */
export const maskPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) {
    return '';
  }

  // 숫자만 추출
  const cleanNumber = phoneNumber.replaceAll(/\D/g, '');

  // 서울 지역번호(02)인 경우
  if (cleanNumber.startsWith('02')) {
    if (cleanNumber.length === 9) {
      // 02-123-4567
      return cleanNumber.replaceAll(/(\d{2})(\d{3})(\d{4})/, '$1-***-$3');
    }
    if (cleanNumber.length === 10) {
      // 02-1234-5678
      return cleanNumber.replaceAll(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
    }
  }

  // 그 외 지역번호 또는 휴대폰 번호
  if (cleanNumber.length === 10) {
    // 011-123-4567 or 031-123-4567
    return cleanNumber.replaceAll(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
  }

  if (cleanNumber.length === 11) {
    // 010-1234-5678
    return cleanNumber.replaceAll(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
  }

  // 포맷에 맞지 않는 경우 원본 반환
  return phoneNumber;
};

/**
 * 이메일 마스킹
 * 예: user@example.com -> use****@example.com
 * 아이디가 3자 미만일 경우 뒤에 * 붙임
 * @param email 이메일 주소
 */
export const maskEmail = (email: string): string => {
  if (!email) {
    return '';
  }

  const match = email.match(/^([^@]+)(@.*)$/);
  if (!match) return email;

  const [, localPart, domain] = match;
  const len = localPart.length;

  if (len <= 3) {
    return localPart + '****' + domain;
  }

  return localPart.substring(0, 3) + '****' + domain;
};

/**
 * 주민등록번호 마스킹 (뒷자리 첫번째 숫자 제외하고 마스킹)
 * 예: 900101-1234567 -> 900101-1******
 * @param rrn 주민등록번호 (하이픈 포함 또는 미포함)
 */
export const maskResidentNumber = (rrn: string): string => {
  if (!rrn) {
    return '';
  }
  const cleanRrn = rrn.replaceAll(/\D/g, '');

  if (cleanRrn.length !== 13) return rrn;

  return cleanRrn.replaceAll(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
};

/**
 * 신용카드 번호 마스킹 (중간 8자리 마스킹)
 * 예: 1234-1234-1234-1234 -> 1234-****-****-1234
 * @param cardNumber 카드번호
 */
export const maskCreditCard = (cardNumber: string): string => {
  if (!cardNumber) {
    return '';
  }
  const cleanNumber = cardNumber.replaceAll(/\D/g, '');

  if (cleanNumber.length < 12) return cardNumber;

  // 앞 4자리, 뒤 4자리 제외하고 모두 마스킹 처리
  const first4 = cleanNumber.substring(0, 4);
  const last4 = cleanNumber.substring(cleanNumber.length - 4);
  const middleMask = '****-****'; // 표준 16자리 기준 포맷팅

  return `${first4}-${middleMask}-${last4}`;
};

/**
 * 계좌번호 마스킹 (앞 3자리, 뒤 4자리 제외하고 마스킹)
 * 예: 123-456-789012 -> 123-**********-9012
 * @param accountNumber 계좌번호
 */
export const maskAccountNumber = (accountNumber: string): string => {
  if (!accountNumber) {
    return '';
  }
  const len = accountNumber.length;

  // 길이가 너무 짧으면 마스킹하지 않음
  if (len < 7) return accountNumber;

  const first3 = accountNumber.substring(0, 3);
  const last4 = accountNumber.substring(len - 4);
  const maskLen = len - 7;

  return first3 + '*'.repeat(maskLen) + last4;
};

/**
 * 여권번호 마스킹 (뒤 4자리 마스킹)
 * 예: M12345678 -> M123****
 * @param passportNumber 여권번호
 */
export const maskPassportNumber = (passportNumber: string): string => {
  if (!passportNumber) {
    return '';
  }
  const len = passportNumber.length;

  if (len < 8) return passportNumber;

  return passportNumber.substring(0, len - 4) + '****';
};

/**
 * IPv4 주소 마스킹 (마지막 옥텟 마스킹)
 * 예: 192.168.0.1 -> 192.168.0.***
 * @param ip IP 주소
 */
export const maskIPv4 = (ip: string): string => {
  if (!ip) {
    return '';
  }

  const parts = ip.split('.');

  if (parts.length !== 4) return ip;

  return `${parts[0]}.${parts[1]}.${parts[2]}.***`;
};
