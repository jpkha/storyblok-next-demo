import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://app.snipcart.com"/>
                <link rel="preconnect" href="https://cdn.snipcart.com"/>
                <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.4.0/default/snipcart.css"/>
                <script async defer src="https://cdn.snipcart.com/themes/v3.4.0/default/snipcart.js"></script>
                <div hidden id="snipcart" data-api-key="OWFmNzY2ZjEtNjczOC00ZGRlLWJjNWMtNjQ3Y2FiZjJiNDhlNjM3OTU1NjY1MjI5NTU4NzQ2"></div>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}