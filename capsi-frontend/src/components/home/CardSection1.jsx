import Image from "next/image";
import Card from "../common/Card";
import image1 from "../../assets/home/image1.png";

export default function CardSection1() {
  return (
    <section className="flex justify-center flex-wrap lg:flex-nowrap gap-10 lg:gap-20 px-5 lg:px-0 ">
      <div
        className="lg:w-1/2 bg-[#2E6BDA] rounded-3xl "
      >
        <Card>
          <Image width={380} height={380} src={image1} alt="Image" />
        </Card>
      </div>
   

      <div className="lg:w-1/2 bg-[#F5F9FF] rounded-3xl text-blue-600	">
        <Card
          title="Unlock Visibility and Boost Engagement"
          text1={
            <span className="text-blue-600">
              Boost business growth on Instagram and other shorts platform by
              enhancing videos with searchable captions.
            </span>
          }
          text2={
            <span className="text-blue-600">
              Expanding visibility, attracting customers, and driving sales
              through increased profile discoverability.
            </span>
          }
          buttonName="Explore Now"
          buttonClass="bg-blue-600 text-white"
        />
      </div>
    </section>
  );
}
