import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="mb-4">
        At Social Manager Pro, accessible from https://smpfe.netlify.app, one of
        our main priorities is the privacy of our users. This Privacy Policy
        outlines the types of information we collect, how we use it, and your
        rights regarding your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
      <p>
        We collect various types of information to improve our service,
        including:
      </p>
      <ul className="list-disc ml-6">
        <li>
          <strong>Personal Information:</strong> Name, email, phone number, and
          other information you provide.
        </li>
        <li>
          <strong>Usage Data:</strong> Information collected automatically when
          you use the service, such as browser type, pages visited, and device
          information.
        </li>
        <li>
          <strong>Cookies and Tracking Data:</strong> We use cookies and
          tracking technologies to improve user experience and analytics.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">How We Use Your Information</h2>
      <ul className="list-disc ml-6">
        <li>To provide and maintain our service.</li>
        <li>To send updates and important notifications about the service.</li>
        <li>To understand how you use our website.</li>
        <li>To ensure security and prevent fraudulent activities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Sharing Your Information</h2>
      <p>We may share your data in the following circumstances:</p>
      <ul className="list-disc ml-6">
        <li>
          <strong>With Service Providers:</strong> To assist in operating our
          service or conducting analytics.
        </li>
        <li>
          <strong>For Legal Reasons:</strong> To comply with legal obligations
          or protect against legal claims.
        </li>
        <li>
          <strong>Business Transfers:</strong> In the case of mergers, sales,
          or acquisition scenarios.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Data Retention</h2>
      <p>
        We retain your personal data only as long as necessary to provide the
        service or as required by law.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Your Data Protection Rights</h2>
      <p>You have the following rights:</p>
      <ul className="list-disc ml-6">
        <li>Right to access your personal data.</li>
        <li>Right to request corrections or deletions.</li>
        <li>Right to restrict processing.</li>
        <li>Right to data portability.</li>
        <li>Right to object to data processing.</li>
      </ul>
      <p>
        To exercise these rights, please contact us at the provided contact
        details below.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Security of Your Data</h2>
      <p>
        We implement security measures to protect your data. However, no
        transmission over the internet or electronic storage is completely
        secure. We cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Third-Party Links</h2>
      <p>
        Our service may contain links to other websites not operated by us. We
        are not responsible for the content, privacy policies, or practices of
        third-party sites.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Changes to This Privacy Policy</h2>
      <p>
        We reserve the right to update this policy at any time. Updates will be
        posted on this page, and significant changes may be communicated
        through email or notifications.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
      <ul className="list-disc ml-6">
        
        <li>Website: <a href="https://smpfe.netlify.app" className="text-blue-600 hover:underline">https://smpfe.netlify.app</a></li>
        <li>Phone: +92  300 0680638</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
