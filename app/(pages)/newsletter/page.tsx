import NewsletterSignUpForm from "@/components/mailchimp-popup";

export default function NewsletterPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Join Our Newsletter</h1>
      <NewsletterSignUpForm />
    </div>
  )
}

