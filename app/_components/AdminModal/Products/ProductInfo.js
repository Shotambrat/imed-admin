import ProductCharacteristics from "./ProductCharacteristics";
import ProductPreview from "./ProductPreview";
import Recenzii from "./Recenzii";



export default function ProductInfo() {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16 px-2">
        <ProductPreview  />
        <ProductCharacteristics />
        <Recenzii />
    </div>
  )
}
