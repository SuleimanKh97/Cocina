export interface addUserDTO {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  image?: File;  // لتخزين الصورة المرفوعة
  imageUrl?: string; // رابط الصورة المرفوعة
}
