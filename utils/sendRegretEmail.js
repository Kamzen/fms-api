const sendEmail = require("./sendEmail");

const sendRegretEmail = ({ emailTo, emailSubject }) => {
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=quicksand, sans-serif:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="http://getbootstrap.com.vn/examples/equal-height-columns/equal-height-columns.css"
      />
      <style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
  
        /* RESET STYLES */
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        table {
          border-collapse: collapse !important;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
  
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
  
        /* MOBILE STYLES */
        @media screen and (max-width: 600px) {
          h1 {
            font-size: 32px !important;
            line-height: 32px !important;
          }
        }
  
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>
    <body
      style="
        background-color: #f4f4f4;
        margin: 0 !important;
        padding: 0 !important;
      "
    >
      <!-- HIDDEN PREHEADER TEXT -->
      <div
        style="
          display: none;
          font-size: 1px;
          color: #fefefe;
          line-height: 1px;
          font-family: quicksand, sans-serif;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
        "
      >
        Welcome to Vico.netTM - your Virtual Collaboration Network.
      </div>
  
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
          <td bgcolor="#ebf5f7" align="center">
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="padding: 40px 10px 40px 10px"
                >
                  <a href="#" target="_blank">
                    <img
                      alt="Logo"
                      src="Your logo"
                      width="220"
                      style="
                        display: block;
                        width: 220px;
                        max-width: 400px;
                        min-width: 100px;
                        font-family: quicksand, sans-serif;
                        color: #ffffff;
                        font-size: 14px;
                      "
                      border="0"
                    />
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
        <!-- HERO -->
        <tr>
          <td bgcolor="#ebf5f7" align="center" style="padding: 0px 10px 0px 10px">
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  valign="top"
                  style="
                    padding: 40px 30px 0px 30px;
                    border-radius: 4px 4px 0px 0px;
                    color: #111111;
                    font-family: quicksand, sans-serif;
                    font-size: 24px;
                    font-weight: 400;
                    letter-spacing: 1px;
                    line-height: 25px;
                  "
                >
                  <h1 style="font-size: 24px; font-weight: 400; margin: 0">
                    Dear Tiyisela Themba Makamu
                  </h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
        <!-- COPY BLOCK -->
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <!-- COPY -->
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  style="
                    padding: 20px 30px 40px 30px;
                    color: #666666;
                    font-family: quicksand, sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 25px;
                  "
                >
                  <p style="margin: 0">
                    <b></b>Welcome to Vico.net&#8482; - your Virtual Collaboration
                    Network.<br />Please click on the button below to LOG IN.
                  </p>
                </td>
              </tr>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td
                        bgcolor="#ffffff"
                        align="center"
                        style="padding: 20px 30px 0px 30px"
                      >
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td
                              align="center"
                              style="border-radius: 50px"
                              bgcolor="#1f58a4"
                            >
                              <a
                                href="$url"
                                target="_blank"
                                style="
                                  font-size: 20px;
                                  font-family: quicksand, sans-serif;
                                  color: #ffffff;
                                  text-decoration: none;
                                  color: #ffffff;
                                  text-decoration: none;
                                  padding: 15px 25px;
                                  border-radius: 50px;
                                  border: 1px solid #1f58a4;
                                  display: inline-block;
                                "
                                >Login
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  style="padding: 20px 0px 0px 0px"
                >
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                          padding: 20px 30px 0px 30px;
                          color: #666666;
                          font-family: quicksand, sans-serif;
                          font-size: 14px;
                          font-weight: 400;
                          line-height: 25px;
                        "
                      >
                        <p style="margin: 0">
                          Should you have any enquiries, please do not hesitate to
                          contact us via email at example@example.com
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
        <!-- COPY CALLOUT -->
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <!-- COPY -->
            </table>
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
        <!-- SUPPORT CALLOUT -->
        <tr>
          <td
            bgcolor="#f4f4f4"
            align="center"
            style="padding: 30px 10px 0px 10px"
          >
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
  
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
        <!-- FOOTER -->
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <!-- PERMISSION REMINDER -->
              <tr>
                <td
                  bgcolor="#f4f4f4"
                  align="center"
                  style="
                    padding: 0px 30px 30px 30px;
                    color: #666666;
                    font-family: quicksand, sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 18px;
                  "
                >
                  <p style="margin: 0">Address</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
      </table>
    </body>
  </html>`;

  const options = { emailTo, emailSubject, html };
  sendEmail(options);
};

module.exports = sendRegretEmail;
