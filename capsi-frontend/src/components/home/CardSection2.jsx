import Image from "next/image";
import Card from "../common/Card";
import image2 from "../../assets/home/image2.png";

export default function CardSection2() {
  return (
    <section className="flex justify-center flex-wrap-reverse lg:flex-nowrap gap-10 lg:gap-20 px-5 lg:px-0">
      <div className="lg:w-1/2 bg-[#F3F8E2] rounded-3xl text-green-800">
        <Card
          title="Silent Impact"
          text1={
            <span className="text-green-800">
              Captions in reels provide a silent, inclusive, and discreet
              viewing experience, more than 80% audience of your account views
              reels by turning of their sound
            </span>
          }
          text2={
            <span className="text-green-800">
              Allowing all audiences to connect visually, especially those
            </span>
          }
          buttonName="Explore Now"
          
        />
      </div>
      <div className="lg:w-1/2 bg-[#73902F] rounded-3xl">
        <Card>
          <Image width={500} height={500} src={image2} alt="Image" />
        </Card>
      </div>
    </section>
  );
}
