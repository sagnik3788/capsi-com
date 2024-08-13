import Link from "next/link";
import Header from "../common/privacy-and-terms/LegalHeader";

export default function Content() {
  return (
    <div className="py-5 px-5 lg:px-0 lg:mx-32">
      <Header title={"Terms of use"} />
      <br />
      <div className="flex flex-col gap-5 text-secondary leading-[1.25rem] md:leading-normal">
        <p>Last updated: 10th Sept, 2023</p>

        <p>Welcome to CapsAi</p>

        <p>
          These terms of service (these “Terms”) govern the use of our network
          and other products and services (collectively, the “Service”) provided
          via capsai.co (the “Site” or “Sites”).
        </p>

        <p>
          By using the Service, registering for it, or providing access to any
          apps via the Service, you agree to be bound by all of the terms and
          conditions of these Terms.
        </p>

        <p>
          These Terms apply to both coupon creators(individuals or entities that
          create coupons) and coupon Consumers (individuals or entities that
          obtain access to coupons via the Service).
        </p>

        <p>
          The “Effective Date” of these Terms is the date you first access the
          Service.
        </p>

        <p>
          We reserve the right to change or modify any of the terms and
          conditions contained in these Terms at any time and in our sole
          discretion. We will provide notice of any changes, which may be sent
          via email, posted on the Site, or through other means determined by
          us. Any changes or modifications will be effective 7 days after notice
          is given. You are responsible for regularly reviewing these Terms to
          ensure you understand and agree to the terms that apply to your use of
          the Service.
        </p>

        <div>
          <p>PRIVACY</p>
          <p>
            For information about how we collect, use and share information
            about users of the Service, please see our
          </p>
          <p>SERVICE & REGISTRATION</p>
          <p>Service</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              CapsAi operates an online platform designed to enhance video
              content with dynamic captions.
            </li>
            <li>Upload videos to automatically generate transcripts.</li>
            <li>CapsAi Customize captions using a variety of set templates.</li>
            <li>
              Edit subtitle text, color, and timestamp for a personalized touch.
            </li>
            <li>
              Simple click on the &quot;Download&quot; button embeds edited
              captions directly into the video.
            </li>
            <li>
              By using the Service, you agree to be bound by the terms and
              conditions outlined in these Terms.
            </li>
          </ul>
        </div>

        <div>
          <p>Registration</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              In order to access the Service, individuals/organisations must
              complete the registration forms provided on the Site.
            </li>
            <li>
              You must provide accurate and up-to-date registration data,
              maintain the security of your account password, and assume all
              risks associated with unauthorized access.
            </li>
            <li>
              You are solely responsible for safeguarding your passwords and any
              activities or transactions related to your CapsAi account or
              password.
            </li>
          </ul>
        </div>

        <div>
          <p>Rights</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              CapsAi is solely responsible for the operation and upkeep of the
              capsai.co platform.
            </li>
            <li>
              Individuals/Organizations retain ownership and responsibility for
              support and claims related to their video content.
            </li>
            <li>
              CapsAi reserves the right to review, screen, or monitor video
              content at any time and for any reason without prior notice.
            </li>
            <li>
              CapsAi may remove any video content that violates terms or
              guidelines.
            </li>
          </ul>
        </div>

        <br />
        <div>
          <p>Prohibited Use and Restrictions</p>
          <p>
            You are prohibited from using the Service for any unauthorized or
            illegal activity, including but not limited to:
          </p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              Modifying, disclosing, altering, translating, or creating
              derivative works of the Service or any components thereof without
              the express permission of CapsAi.
            </li>
            <li>
              Licensing, sublicensing, reselling, distributing, leasing,
              renting, lending, transferring, assigning, or otherwise disposing
              of the Service or any components thereof without the express
              permission of CapsAi.
            </li>
            <li>
              Disassembling, decompiling, or reverse engineering the software
              components of the Service.
            </li>
            <li>
              Storing or transmitting infringing, libelous, or otherwise
              unlawful or tortious material, or material in violation of
              third-party privacy rights.
            </li>
            <li>
              Storing or transmitting any viruses, software routines, or other
              code designed to permit unauthorized access, disable, erase, or
              otherwise harm software, hardware, or data, or to perform any
              other harmful actions.
            </li>
            <li>
              Copying, framing, or mirroring any part or content of the Service.
            </li>
            <li>
              Building a competitive product or service, or copying any features
              or functions of the Service.
            </li>
            <li>
              Interfering with or disrupting the integrity or performance of the
              Service.
            </li>
            <li>
              Attempting to gain unauthorized access to the Service or related
              systems or networks.
            </li>
            <li>
              Removing, altering, or obscuring any proprietary notices in or on
              the Service, including copyright notices.
            </li>
            <li>
              Causing or permitting any third-party to do any of the foregoing.
            </li>
            <li>
              Interfering in any manner with the enjoyment of the Service by
              other users.
            </li>
            <li>
              By using the Service, you agree to comply with all applicable laws
              and regulations. CapsAi reserves the right to terminate or
              restrict your access to the Service if you engage in any
              prohibited or illegal activity.
            </li>
          </ul>
        </div>

        <div>
          <p>Suspension or Termination</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              CapsAi may suspend or terminate a user‘s access to the service at
              any time and for any reason without notice.
            </li>
            <li>
              If a user‘s access is suspended or terminated, they must stop
              accessing or using the Service immediately.
            </li>
            <li>
              CapsAi may take legal action against a user for continuing to use
              the service during suspension or after termination.
            </li>
            <li>
              These terms will remain enforceable against the user while their
              license to access or use the Service is suspended and after it is
              terminated.
            </li>
          </ul>
        </div>

        <div>
          <p>Disclaimer</p>
          <p>
            YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS
            PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. CapsAi DISCLAIMS
            ALL WARRANTIES AND REPRESENTATIONS (EXPRESS OR IMPLIED, ORAL OR
            WRITTEN) WITH RESPECT TO THESE TERMS, THE SERVICE, ANY OF THE APPS
            PROVIDED VIA THE SERVICE, ANY API CONTENT/TERMS, ANY USER CONTENT,
            THE SITE (INCLUDING ANY INFORMATION AND CONTENT MADE AVAILABLE VIA
            THE SITE ), THIRD-PARTY INFRASTRUCTURE (AS DEFINED BELOW) AND
            THIRD-PARTY TRADEMARKS, WHETHER ALLEGED TO ARISE BY OPERATION OF
            LAW, BY REASON OF CUSTOM OR USAGE IN THE TRADE, BY COURSE OF DEALING
            OR OTHERWISE, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR ANY PURPOSE, NON-INFRINGEMENT, AND CONDITION OF TITLE.
          </p>
        </div>

        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, VideoCaptionsAi
          DOES NOT WARRANT, AND DISCLAIMS ALL LIABILITY FOR (A) THE
          COMPLETENESS, ACCURACY, AVAILABILITY, TIMELINESS, SECURITY, OR
          RELIABILITY OF THE SERVICE, ANY OF THE APIS PROVIDED VIA THE SERVICE,
          ANY USER CONTENT, THE SITE (INCLUDING ANY INFORMATION OR CONTENT MADE
          AVAILABLE VIA THE SITE), OR THIRD-PARTY TRADEMARKS; (B) ANY HARM TO
          YOUR COMPUTER SYSTEM, LOSS OF DATA, OR OTHER HARM THAT RESULTS FROM
          YOUR ACCESS TO OR USE OF THE SERVICE AND ANY API MADE AVAILABLE VIA
          THE SERVICE; (C) THE DELETION OF, OR THE FAILURE TO STORE OR TRANSMIT,
          ANY USER CONTENT AND OTHER COMMUNICATIONS MAINTAINED BY THE SERVICE;
          AND (D) WHETHER THE SERVICE WILL MEET YOUR REQUIREMENTS OR BE
          AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS.
        </p>

        <div>
          <p>Indemnification</p>
          <p>
            You agree, at your sole expense, to defend, indemnify and hold
            CapsAi (and its directors, officers, employees, consultants and
            agents) harmless from and against any and all actual or threatened
            suits, actions, proceedings (at law or in equity), claims, damages,
            payments, deficiencies, fines, judgments, settlements, liabilities,
            losses, costs and expenses (including, but not limited to,
            reasonable attorneys’ fees, costs, penalties, interest and
            disbursements) for any death, injury, property damage caused by,
            arising out of, resulting from, attributable to or in any way
            incidental to any of your conduct or any actual or alleged breach of
            any of your obligations under these Terms (including, but not
            limited to, any actual or alleged breach of any of your
            representations or warranties as set forth in these Terms).
          </p>
        </div>

        <div>
          <p>Limitation of liability</p>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, CapsAiWILL NOT BE
            LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INCIDENTAL, SPECIAL,
            INDIRECT, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES WHATSOEVER,
            ARISING OUT OF OR RELATED TO THESE TERMS, THE SERVICE, ANY OF THE
            APIS PROVIDED VIA THE SERVICE, ANY API CONTENT/TERMS, ANY USER
            CONTENT, THE SITE (INCLUDING ANY INFORMATION AND CONTENT MADE
            AVAILABLE VIA THE SITE AND VideoCaptionsAi MATERIALS), THIRD-PARTY
            INFRASTRUCTURE OR THIRD-PARTY TRADEMARKS, HOWEVER CAUSED, REGARDLESS
            OF THE THEORY OF LIABILITY (CONTRACT, WARRANTY, TORT (INCLUDING
            NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), PRODUCT LIABILITY,
            STRICT LIABILITY, OR OTHER THEORY), EVEN IF VideoCaptionsAi HAS BEEN
            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </div>

        <p>
          IN NO EVENT SHALL THE AGGREGATE LIABILITY OF VideoCaptionsAi ARISING
          OUT OF OR RELATED TO THESE TERMS, THE SERVICE, ANY OF THE APIS
          PROVIDED VIA THE SERVICE, ANY API CONTENT/TERMS, ANY USER CONTENT, THE
          SITE (INCLUDING ANY INFORMATION OR CONTENT MADE AVAILABLE VIA THE
          SITE), THIRD-PARTY INFRASTRUCTURE OR THIRD-PARTY TRADEMARKS EXCEED ONE
          HUNDRED U.S. DOLLARS (USD $100.00).
        </p>

        <p>
          SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR
          CONSEQUENTIAL DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU.
        </p>

        <p>
          CapsAi reserves the right, but does not have the obligation, to
          review, screen, or monitor any links to any Apps or any App
          Content/Terms (as defined below) at any time and for any reason
          without notice.
        </p>

        <div>
          <p>Arbitration</p>
          <p>
            PLEASE READ THE FOLLOWING PARAGRAPHS CAREFULLY BECAUSE THEY REQUIRE
            YOU TO ARBITRATE DISPUTES WITH CapsAi AND LIMIT THE MANNER IN WHICH
            YOU CAN SEEK RELIEF FROM CapsAi.
          </p>
        </div>

        <p>
          In the event of any controversy or claim arising out of or relating in
          any way to these Terms or the Service, you and CapsAi agree to consult
          and negotiate with each other and, recognizing your mutual interests,
          try to reach a solution satisfactory to both parties. If we do not
          reach settlement within a period of 60 days, then either of us may, by
          notice to the other, demand mediation under the mediation rules of the
          Indian Council of Arbitration (ICA) based in New Delhi, India. We both
          give up our right to litigate our disputes and may not proceed to
          arbitration without first trying mediation, but you and CapsAi are NOT
          required to arbitrate any dispute in which either party seeks
          equitable and other relief from the alleged unlawful use of
          copyrights, trademarks, trade names, logos, trade secrets or patents.
          Except as otherwise required under applicable law, you and CapsAi
          intend and agree: (a) not to assert class action or representative
          action procedures and agree that they will not apply in any
          arbitration involving the other; (b) not to assert class action or
          representative action claims against the other in arbitration or
          otherwise; and (c) will only submit individual claims in arbitration
          and will not seek to represent the interests of any other person or
          entity.
        </p>

        <p>
          If settlement is not reached within 60 days after service of a written
          demand for mediation, any unresolved controversy or claim will be
          resolved by arbitration in accordance with the rules of the Indian
          Council of Arbitration (ICA) based in New Delhi, India. The language
          of all proceedings and filings will be English. The arbitrator will
          render a written opinion including findings of fact and law and the
          award and/or determination of the arbitrator will be binding on the
          parties, and their respective administrators and assigns, and will not
          be subject to appeal. Judgment may be entered upon the award of the
          arbitrator in any court of competent jurisdiction. The expenses of the
          arbitration will be shared equally by the parties unless the
          arbitration determines that the expenses will be otherwise assessed
          and the prevailing party may be awarded its attorneys’ fees and
          expenses by the arbitrator. It is the intent of the parties that,
          barring extraordinary circumstances, arbitration proceedings will be
          concluded within 90 days from the date the arbitrator is appointed.
          The arbitrator may extend this time limit only if failure to do so
          would unduly prejudice the rights of the parties. Failure to adhere to
          this time limit will not constitute a basis for challenging the award.
          Consistent with the expedited nature of arbitration, pre-hearing
          information exchange will be limited to the reasonable production of
          relevant, non-privileged documents, carried out expeditiously.
        </p>

        <div>
          <p>Miscellaneous</p>
          <p>Feedback</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              Any suggestions, comments, or other feedback provided by you to
              CapsAi with respect to the Service or CapsAi will be considered
              non-confidential and non-proprietary.
            </li>
            <li>
              By providing Feedback to CapsAi, you grant CapsAi a non-exclusive,
              worldwide, royalty-free, irrevocable, sub-licensable, and
              transferable license to use, copy, distribute, and disclose the
              Feedback in any manner and for any purpose.
            </li>
          </ul>
        </div>

        <div>
          <p>Feedback</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              You are granted a limited, non-exclusive right to create a text
              hyperlink to the Service for noncommercial purposes, provided such
              link does not portray CapsAi or any of its products and services
              in a false, misleading, derogatory, or defamatory manner and that
              the linking site does not contain any material that is offensive,
              illegal, harassing, or otherwise objectionable.
            </li>
            <li>This limited right may be revoked at any time.</li>
            <li>
              CapsAi makes no claim or representation regarding, and accepts no
              responsibility for, the quality, content, nature, or reliability
              of third-party sites accessible by link from the Service or Site.
            </li>
            <li>
              CapsAi provides these links to you only as a convenience, and the
              inclusion of any link does not imply affiliation, endorsement, or
              adoption by CapsAi of the corresponding site or any information
              contained in (or made available via) that site.
            </li>
            <li>
              When you leave the Site, CapsAi’s terms and policies no longer
              govern.
            </li>
            <li>
              You should review the applicable terms and policies, including
              privacy and data-gathering practices, of any site to which you
              navigate from the Site.
            </li>
          </ul>
        </div>

        <div>
          <p>Third-Party Advertising</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              CapsAi may run advertisements and promotions from third parties
              through or in connection with the Service or may provide
              information about or links to third-party products or services.
            </li>

            <li>
              Your dealings or correspondence with, or participation in
              promotions of, any such third parties, and any terms, conditions,
              warranties, or representations associated with such dealings,
              correspondence, or promotions, are solely between you and the
              applicable third party.
            </li>
            <li>
              CapsAi is not responsible or liable for any loss or damage of any
              sort incurred as the result of any such dealings, correspondence,
              or promotions or as the result of the presence of such advertisers
              or third-party information made available through the Service.
            </li>
          </ul>
        </div>

        <div>
          <p>Independent Contractors</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              The parties will only have the relationship of independent
              contractors.
            </li>
            <li>
              Neither party will be considered an agent, franchisor, franchise,
              employee, representative, owner, or partner of the other party.
            </li>
            <li>
              Neither party will have the authority to make any representations
              or warranties on behalf of the other party or to bind the other
              party in any way.
            </li>
          </ul>
        </div>

        <div>
          <p>Assignment</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              You may not assign, delegate, or transfer these Terms or any
              rights without the prior written consent of CapsAi.
            </li>
            <li>
              Any attempted or purported assignment, delegation, or transfer
              without consent will be null and void.
            </li>
            <li>
              CapsAi may assign these Terms without your prior written consent
              and the terms will be binding and inure to the benefit of the
              assignees, transferees, and other successors.
            </li>
          </ul>
        </div>

        <div>
          <p>Third-Party Infrastructure</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              CapsAi uses a third-party hosting infrastructure in connection
              with the Services.
            </li>
            <li>
              The provider(s) of the Third-Party Infrastructure make no
              representation or warranty with respect to such Third-Party
              Infrastructure.
            </li>
            <li>
              CapsAi assumes no liability for any claim that may arise with
              respect to such Third-Party Infrastructure.
            </li>
          </ul>
        </div>

        <div>
          <p>Electronic Communications</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              By using the Service, you agree to receive electronic
              communications regarding your use of the Service.
            </li>
            <li>
              Any notices, agreements, disclosures or other communications sent
              electronically will satisfy any legal communication requirements.
            </li>
            <li>
              You may withdraw your consent to receive electronic notices by
              contacting support@https://capsai.co/
            </li>
          </ul>
        </div>

        <div>
          <p>Severability</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              If any provision of these Terms is invalid, illegal, or incapable
              of being enforced by any rule of law or public policy, all other
              provisions of these Terms will remain in full force and effect.
            </li>
            <li>
              The parties will negotiate in good faith to modify these Terms to
              effect the original intent of the parties if any provision is
              invalid, illegal, or incapable of being enforced.
            </li>
          </ul>
        </div>

        <div>
          <p>Force Majeure</p>
          <ul className="ml-6 list-disc leading-[1.25rem]">
            <li>
              CapsAi is not responsible for any failure to perform or delay
              caused by any event beyond its reasonable control, including acts
              of God, acts of terrorism, civil disturbances, disruption of power
              or other essential services, interruption or termination of
              services provided by any service providers used by CapsAi, labor
              disturbances, vandalism, cable cut, computer viruses or other
              similar occurrences, or any malicious or unlawful acts of any
              third party.
            </li>
          </ul>
        </div>

        <div>
          <p>GDPR</p>
          <p>
            Under GDPR, CapsAi is a data processor. If you need to have CapsAi
            sign a DPA with your company, please contact us at{" "}
            <Link href="mailto:chetankudnekar50@gmail.com">support@CapsAi</Link>{" "}
            . Data Processing Agreement (DPA) outlines how it processes personal
            data on behalf of its customers. This DPA is available to customers
            upon request.
          </p>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
