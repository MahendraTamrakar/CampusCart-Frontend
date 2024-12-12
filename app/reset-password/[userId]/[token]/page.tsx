import ResetPasswordForm from '@/components/ResetPasswordForm'

export default function ResetPasswordPage({
  params,
}: {
  params: { userId: string; token: string }
}) {
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
      <ResetPasswordForm userId={params.userId} token={params.token} />
    </div>
  )
}

