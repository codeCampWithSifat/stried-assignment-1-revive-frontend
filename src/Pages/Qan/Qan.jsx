import { Accordion } from "rsuite";
import { FaAngleDoubleDown } from "react-icons/fa";

const Qan = () => {
  return (
    <div>
      <div className="">
        <div>
          <Accordion defaultActiveKey={1}>
            <Accordion.Panel
              className="mt-32 max-w-[1140px] mx-auto"
              header="We offer rejuvenating treatments that surpass industry standards."
              eventKey={1}
              caretAs={FaAngleDoubleDown}
            >
              <p>
                Treatments at our spa are more than routine procedures; they are
                a holistic experience designed to revitalize the body. We
                consistently innovate and update our offerings based on the
                latest research and global trends. Our techniques, products, and
                equipment all meet and often exceed international benchmarks,
                ensuring that what you get here is nothing short of the best.
              </p>
            </Accordion.Panel>
          </Accordion>
          <Accordion defaultActiveKey={1}>
            <Accordion.Panel
              className=" max-w-[1140px] mx-auto"
              header="Our spa environment is a haven of luxury and tranquility, designed for ultimate relaxation."
              eventKey={1}
              caretAs={FaAngleDoubleDown}
            >
              <p>
                The moment you step into our spa, the chaos of the outside world
                fades away. We have designed the environment in a way that
                reflects calm and luxury. Ambient lighting, soothing music, and
                delicate fragrances synergize to provide an atmosphere that
                wraps you in tranquility. Each corner of our spa testifies to
                our commitment to offering unparalleled luxury.
              </p>
            </Accordion.Panel>
          </Accordion>

          <Accordion defaultActiveKey={1}>
            <Accordion.Panel
              className=" max-w-[1140px] mx-auto"
              header="Depending on your unique wellness requirements, our therapists will create an individual treatment plan for you."
              eventKey={1}
              caretAs={FaAngleDoubleDown}
            >
              <p>
                We understand that each individual’s wellness requirements are
                unique, which is why our well-trained therapists take the time
                to consult with you and assess your needs. This helps us craft a
                bespoke treatment plan, customized exclusively for you. Our aim
                is not just to provide a day of relaxation, but a rejuvenation
                journey that caters to your specific needs.
              </p>
            </Accordion.Panel>
          </Accordion>

          <Accordion defaultActiveKey={1}>
            <Accordion.Panel
              className=" max-w-[1140px] mx-auto"
              header="Strict sanitization practices to ensure a clean and healthy spa experience."
              eventKey={1}
              caretAs={FaAngleDoubleDown}
            >
              <p>
                Your health and safety are our utmost priority. In times when
                cleanliness is of paramount importance, we have doubled down on
                our sanitization efforts. Every piece of equipment, tool, and
                space undergoes rigorous cleaning before and after each use. We
                adhere to international sanitization standards and employ the
                latest technology to ensure a risk-free, healthy spa experience.
              </p>
            </Accordion.Panel>
          </Accordion>
          <Accordion defaultActiveKey={1}>
            <Accordion.Panel
              className=" max-w-[1140px] mx-auto"
              header="Offering a universally comfortable spa experience to local and international guests."
              eventKey={1}
              caretAs={FaAngleDoubleDown}
            >
              <p>
                Whether you are a local resident seeking a quick escape or an
                international traveler looking for an authentic Bangladeshi
                wellness experience, we’ve got you covered. Our staff is trained
                to cater to a diverse clientele, ensuring communication is never
                a barrier. Cultural sensitivity, multilingual support, and
                understanding of varied wellness traditions ensure that every
                guest, regardless of their origin, feels completely at home and
                at ease.
              </p>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Qan;
