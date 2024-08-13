import Image from "next/image";
import Card from "../common/Card";
import image3 from "../../assets/home/image3.png";

export default function CardSection3() {
  return (
    <section className="flex justify-center flex-wrap lg:flex-nowrap gap-10 lg:gap-20 px-5 lg:px-0  ">
      <div className="lg:w-1/2 bg-gradient-to-b from-gradient-start to-gradient-end rounded-3xl">
        <Card>
          <Image width={500} height={500} src={image3} alt="Image" />
        </Card>
      </div>
      <div className="lg:w-1/2 bg-gradient-to-b from-gradient-left to-gradient-right rounded-3xl text-[#240C56]">
        <Card
          title="Increasing average viewer watch time"
          text1={
            <span className="text-[#240C56]">
              Effective content has to immediately keep their attention.
              Instagram video captions offer more context and depth to media
              engagement, making viewers more likely to watch a video longer.
            </span>
          }
          buttonName="Explore Now"
          buttonClass="colored-button"
        />
      </div>
    </section>
  );
}
