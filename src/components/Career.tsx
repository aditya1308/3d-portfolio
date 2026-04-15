import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Societe Generale Global Solution Centre</h5>
                <h5>Bengaluru</h5>
              </div>
              <h3>2024 - Present </h3>
            </div>
            <p>
              Responsible for designing and creating APIs using Java Springboot for the Client Exposure Monitoring team. These APIs are used for the pushing and extracting data to and from OpenSee database.
Implemented and reduced the latency of API for getting data of multiple Legal Entities (LE) which has about 60Mb of data per LE.
Increased test coverage to 99% in most of the existing modules
Implemented new push strategies which uses Kafka notification to trigger a Spark job and push millions of data after customization into OPENSEE database
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Operations Associate</h4>
                <h5>Unacademy</h5>
                <h5>Remote</h5>
              </div>
              <h3>Jul 2023 - Nov 2023</h3>
            </div>
            <p>
              <b>Operations Associate</b> Worked in the content team for UnacademyX team for reviewing and maintaining the quality of the content which brought down the errors and typo to almost 0%
Used figma for designing the content slides which went into the UnacademyX app
Maintained excels sheets efficiently for timely delivery of content slides, almost 1000 slides per day.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Engineer - Intern </h4>
                <h5>uTrade Solutions Pvt. Ltd.</h5>
                <h5>Mohali</h5>
              </div>
              <h3>2022-2023</h3>
            </div>
            <p>
              Worked in the development and new features of HFT(High Frequency Trading) which is being used in uTrade.
As a C++ backend developer, responsible for developing new features and improving existing features of HFT.
Development in frontend for uTrade Algo in QT framework, reducing latency by optimizing code also developing new features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
