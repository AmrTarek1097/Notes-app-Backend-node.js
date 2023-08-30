export const htmlMail = (verifiy) => {
    return  `<table width="650" style="font-family: Helvetica, Arial, sans-serif; background: #fff; margin: 0 auto;">
	<tr>
		<td style="padding-top: 40px; padding-bottom: 40px;">
			<p style="text-align: center;">logo goes here</p>
		</td>
	</tr>
</table>

<table width="650" style="font-family: Helvetica, Arial, sans-serif; background: #fff; margin: 0 auto; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;">
	<tr>
		<td style="padding-top: 40px; padding-bottom: 40px; padding-left: 10px; padding-right: 10px; text-align: center;">
			<h1 style="font-size: 40px; font-weight: 100; margin-bottom: 20px; color: #6759fb;">You're almost there</h1>
			<p style="font-size: 20px; margin-bottom: 30px; line-height: 26px;">Thank you for signing up for Conversful.<br> Click the button below to verify your email and start conversing.</p>
			<a href="${verifiy}" style="margin-bottom: 30px; display: inline-block; background: #6759fb; color: #fff; text-decoration: none; padding: 20px 30px; border-radius: 10px; font-size: 20px;">Verify email address</a>
			<p style="color: #777777;">Conversful is currently only supported on desktops.</p>
		</td>
	</tr>
</table>

<table width="650" style="font-family: Helvetica, Arial, sans-serif; background: #fff; margin: 0 auto;">
	<tr>
		<td style="padding-top: 40px; padding-bottom: 40px; padding-left: 10px; padding-right: 10px; text-align: center;">
			<p style="color: #777777; line-height: 20px;">You received this email because you signed up for a Conversful account with this email address. If this was a mistake, ignore this email &mdash; the account hasn't been created yet.</p>
		</td>
	</tr>
</table>`
    
}