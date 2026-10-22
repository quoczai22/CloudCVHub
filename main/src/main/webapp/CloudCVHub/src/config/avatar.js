import maleSvg from '../assets/avatars/male.svg'
import femaleSvg from '../assets/avatars/female.svg'

// Cấu hình SVG avatar 1 Nam (đàn ông) và 1 Nữ (đàn bà)
export const AVATARS = {
  male: {
    id: "male",
    label: "Đàn ông (Nam)",
    role: "Developer",
    svg: maleSvg,
    url: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Side&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  },
  female: {
    id: "female",
    label: "Đàn bà (Nữ)",
    role: "Designer",
    svg: femaleSvg,
    url: "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairMiaWallace&accessoriesType=Blank&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Gray02&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  },
}

export function getCurrentAvatarGender() {
  if (typeof window === "undefined") return "male"
  return localStorage.getItem("avatar_gender") || "male"
}

export function getAvatarUrl(gender) {
  const g = gender || getCurrentAvatarGender()
  // Trả về file SVG local được Vite đóng gói tối ưu, fallback sang URL nếu cần
  return AVATARS[g]?.svg || AVATARS[g]?.url || AVATARS.male.svg
}

export function setAvatarGender(gender) {
  if (typeof window !== "undefined") {
    localStorage.setItem("avatar_gender", gender)
    window.dispatchEvent(new Event("avatar_change"))
  }
}
