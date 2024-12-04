import { Card } from '@/components/ui/card';
import Link from 'next/link';

const MediaCredentials = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Media Credentials</h1>
        </div>

        <Card className="p-8 bg-white shadow-md">
          <div className="prose max-w-none">
            <div className="mb-8">
              <h3 className="text-xl font-bold italic text-gray-900">
                MEDIA ACCREDITATION FOR SEATTLE SEAWOLVES RUGBY MATCHES IS RESERVED FOR MEMBERS OF THE PRESS WHO CURRENTLY REPRESENT A BONA FIDE MEDIA ORGANIZATION
              </h3>
              
              <p className="mt-4 text-gray-700">
                Submission of an application does not guarantee approval and is subject to review by the Seattle Seawolves Rugby Marketing & Communications department. Approved members will be notified via email. Prior year credential holders must re-apply for current year credentials. Applications for individual matches must be submitted a minimum of <span className="font-bold">72 hours</span> prior to match kickoff.
              </p>

              <p className="mt-4 text-gray-700">
                To request media credentials, <span className="font-bold">download and fill out </span>
                <Link href="https://seawolves.rugby/wp-content/uploads/sites/14/2024/01/MEDIA-CREDENTIALS-REQUEST.pdf" 
                      className="text-blue-600 hover:text-blue-800 font-bold">
                  MEDIA CREDENTIALS REQUEST.
                </Link>
              </p>

              <p className="mt-4 text-gray-700">
                For questions about a credential request or other media-related inquiries please email 
                <Link href="mailto:media@seawolves.rugby" className="text-blue-600 hover:text-blue-800 ml-1">
                  media@seawolves.rugby
                </Link>. 
                Access to a media credential is subject to the credential use conditions outlined below.
              </p>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900">NOTICE OF CREDENTIAL USE CONDITIONS</h4>

              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">Agreement</h5>
                <p className="text-gray-700">
                  Use of this credential by the bearer constitutes the bearer's agreement and the agreement of the bearer's employer to the terms stated below. Compliance with these terms is a condition of all uses permitted by this credential. Any unauthorized use of this credential or violation of any term of this credential automatically and immediately revokes all permissions granted in this credential and subjects the bearer to ejection from the stadium and possible prosecution for criminal trespass. This credential must be surrendered upon demand by Seattle Seawolves Rugby.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">Credential Use</h5>
                <p className="text-gray-700">
                  This credential is issued solely to provide stadium access to an individual with a legitimate working function at a game involving Seattle Seawolves Rugby, solely to perform such function. The bearer must be on a specific assignment as an employee or agent for the organization to which this credential is issued. It is forbidden to lend, sell or otherwise transfer this credential.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">Release of Liability</h5>
                <p className="text-gray-700">
                  The bearer of this credential and his or her employer assume all risk and danger of personal injury and all other hazards arising from or related in any way to stadium access, and agree to indemnify and hold harmless Seattle Seawolves Rugby, Major League Rugby, other agents and employees from and against all liability, loss, damages or expense resulting from or arising out of the bearer's presence at the stadium.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">No Personal Use</h5>
                <p className="text-gray-700">
                  Credential bearers may not request autographs, take non-work-related photographs or make any other personal use of this credential or the stadium access conferred by this credential.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MediaCredentials;