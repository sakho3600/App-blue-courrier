<html>
   <#assign serviceName=args["serviceName"]/>
   <#assign title=args["title"]!"Rapport d'alerte pour le service ${serviceName}"/>
   <#assign object=args["object"]!"Voici la liste des courriers en attente de traitement dont le délai de traitement est en alerte."/>
   <#assign roleName=args["roleName"]/>
   <#assign mails=args["mails"]/>
   <#assign userDisplayName=args["userDisplayName"]/>
   <#assign senderDisplayName=args["senderDisplayName"]!"BlueCourrier"/>

   <head>
      <style type="text/css"><!--
      body
      {
         font-family: Arial, sans-serif;
         font-size: 14px;
         color: #4c4c4c;
      }
      
      a, a:visited
      {
         color: #0072cf;
      }
      --></style>
   </head>

   <body bgcolor="#dddddd">
      <table width="100%" cellpadding="20" cellspacing="0" border="0" bgcolor="#dddddd">
         <tr>
            <td width="100%" align="center">
               <table width="70%" cellpadding="0" cellspacing="0" bgcolor="white" style="background-color: white; border: 1px solid #aaaaaa;">
                  <tr>
                     <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                           <tr>
                              <td style="padding: 10px 30px 0px;">
                                   <div style="font-size: 12px; padding-bottom: 4px; text-align:right">
                                      ${date?date?string.full}
                                   </div>                                   
                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                       <td>
                                          <table cellpadding="0" cellspacing="0" border="0">
                                             <tr>
                                                <td>
                                                   <img src="${shareUrl}/res/yamma/resources/images/mail_64.png" alt="" width="64" height="64" border="0" style="padding-right: 20px;" />
                                                </td>
                                                <td>
                                                   <div style="font-size: 22px; padding-bottom: 4px;">
                                                      ${title}
                                                   </div>
                                                   <div style="font-size: 15px; font-style: italic">
                                                      ${object}
                                                   </div>
                                                </td>
                                             </tr>
                                          </table>
                                          <div style="font-size: 14px; margin: 12px 0px 24px 0px; padding-top: 10px; border-top: 1px solid #aaaaaa;">
                                             <p>Bonjour ${userDisplayName!""},</p>
                                             
                                             <p>Voici la liste des courriers concernés dans le service ${serviceName} :</p>
                                             
                                             <table width="80%" cellpadding="2px" cellspacing="0" border="0">
                                             <#list mails as mail>
                                             	<tr>
                                             		<td>
                                             			<a target="bluecourrier" href="${shareUrl}/page/yamma?nodeRef=${mail.nodeRef!""}">${mail.object} [${mail.name}]</a>
                                             		</td>
                                             		<td>
                                             			${(mail.dueDate)?date?string.short} soit <i>${mail.lateDaysNb} jours</i>
                                             		</td>
                                             		<td>
                                             			${mail.instructorName!"Non assigné"}
                                             		</td>
                                             	</tr>
                                             </#list>
                                             </table>
                                                                                          
                                             <p>Cordialement,<br />
                                             ${senderDisplayName}.</p>
                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div style="border-top: 1px solid #aaaaaa;">&nbsp;</div>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div style="border-bottom: 1px solid #aaaaaa;">&nbsp;</div>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding: 10px 30px;">
                                 <a href="${shareUrl}/page/yamma"><img src="${url.serverPath}${url.context}/service/bluedolmen/yamma/logo" alt="" height="64px" border="0" /></a>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>