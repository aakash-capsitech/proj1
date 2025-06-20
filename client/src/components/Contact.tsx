const Contact = () => {
  return (
    <div className="max-w-[1440px] bg-[#FE4644] pl-32 mx-auto">
      <div className="max-w-[1280px] py-12">
        <div className="text-yellow-400 text-xl mb-2">
          <p>Let's talk</p>
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
          <h1>Let's build something awesome together!</h1>
        </div>
        <div>
          <button className="px-6 py-3 mt-6 rounded-full text-white border-2 border-white hover:bg-white hover:text-[#FE4644] transition duration-300">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
