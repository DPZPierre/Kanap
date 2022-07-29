const parsedUrl= new URL (window.location.href)
const productId = parsedUrl.searchParams.get("id")
const orderId = document.getElementById("orderId")