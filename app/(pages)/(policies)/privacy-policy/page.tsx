import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy & Terms of Use</h1>
            <p className="mt-2 text-gray-600">Effective May 18, 2017</p>
          </div>

          <Card className="p-6  ">
            <div className="prose max-w-none">
              <p className="text-gray-700">
                This privacy policy and terms of use sets out how Major League Rugby uses and protects any information you provide when using this website. If you have questions regarding our Privacy Policy and Terms of Use, please contact Major League Rugby via our contact page.
              </p>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Acceptance of Terms of Use</h2>
                <p className="mt-4 text-gray-700">
                  Major League Rugby offers you a wide range of content, communication tools, and information about its solutions via this website. By using this website, you are agreeing to accept and comply with the terms and conditions of use as stated here, which Major League Rugby may update at any time without notice.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Ticket Sales</h2>
                <p className="mt-4 text-gray-700">
                  All Seattle Seawolves ticket sales are final. No requests for cancellations, changes, or refunds are accepted. In the event that a performance is either canceled or postponed, the Seawolves will make every effort to contact the patron via email.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Messaging Terms & Conditions</h2>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>
                    When you opt-in to the service, we will send you a message to confirm your signup. Message frequency varies, and additional mobile messages may be sent periodically based on your interaction with Seattle Seawolves.
                  </p>
                  <p>
                    To cancel, text "STOP" at any time. For help, text "HELP" for assistance.
                  </p>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                <p className="mt-4 text-gray-700">
                  You have control over your personal information. In general, you can visit our website without providing us with any personal information. However, there are instances where we must have your personal information in order to grant you access to our protected and secured site.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Cookies</h2>
                <p className="mt-4 text-gray-700">
                  We use traffic log cookies to monitor which pages on our website are being used. This helps us analyze data about web page traffic and improve our website in order to tailor it to customer needs. You may choose to accept or decline cookies in most web browser settings.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
                <p className="mt-4 text-gray-700">
                  In no event shall Major League Rugby be liable for any direct, indirect, special, incidental, or consequential damages including without limitation, lost profits or revenues, costs of replacement goods, loss or damage to data arising out of the use or inability to use this website.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                <p className="mt-4 text-gray-700">
                  Seattle Seawolves Rugby<br />
                  14900 Interurban Ave S Ste 268<br />
                  Tukwila WA US 98168-4635<br />
                  Email: info@seawolves.rugby
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;