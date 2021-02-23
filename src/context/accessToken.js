export default function accessToken() {
    return `Bearer ${localStorage.getItem("accessToken")}` || null;
  }
  