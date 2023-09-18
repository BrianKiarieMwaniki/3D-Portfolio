import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]:value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //template_n5dtkwd
    //service_xh4ccko
    //vYgY6DT_VjzubCVa0
    emailjs
      .send(
        "service_xh4ccko",
        "template_n5dtkwd",
        {
          from_name: form.name,
          to_name: "Brian",
          from_email: form.email,
          to_email: "briank.mwaniki@gmail.com",
          message: form.message,
        },
        "vYgY6DT_VjzubCVa0"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank You! I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong!");
        }
      );
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-12"
        >
          <label htmlFor="" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="px-6 py-4 font-medium text-white border-none rounded-lg bg-tertiary placehodler: text-secondary outlined-none"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="px-6 py-4 font-medium text-white border-none rounded-lg bg-tertiary placehodler: text-secondary outlined-none"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="px-6 py-4 font-medium text-white border-none rounded-lg bg-tertiary placehodler: text-secondary outlined-none"
            />
          </label>
          <button
            type="submit"
            className="px-8 py-3 font-bold text-white shadow-md outline-none rounded-xl rounde bg-tertiary w-fit shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas/>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
