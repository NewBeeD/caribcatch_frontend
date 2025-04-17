import Image from "next/image";

const Section1 = () => {
  return (
    <section
      style={{
        position: "relative",
        height: "65vh",
        marginTop: "-64px",
        paddingTop: "64px",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Image
          src="/Body/Section1/MainImage1.png"
          fill
          style={{ objectFit: "cover" }}
          priority
          alt="Main Body Image"
          quality={90}
        />
      </div>

      {/* Centered Content with Enhancements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          color: "white",
          padding: "2rem",
          textAlign: "center",
          background: "radial-gradient(circle, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)",
 // semi-transparent overlay
        }}
      >
        <h1 
        style={{ maxWidth: "600px", fontSize: "1.5rem" }}>
          Serving the highest quality produce to our quality customers.
        </h1>
      </div>
    </section>
  );
};

export default Section1;
