interface EmulatorProps {
    type: string;
    rom: string;
    platform: string;
    core?: string;
    bios?: string;
    redirected?: boolean;
}

export default ({ type, rom, bios, core, platform, redirected }: EmulatorProps) => {
    const script = `
    window.Bun = {
        env: {
            "LIBRARY_PATH": ${JSON.stringify(Bun.env.LIBRARY_PATH)},
            "AUTO_REDIRECT": ${Bun.env.AUTO_REDIRECT}
        }
    }
    window.RUNR = ${JSON.stringify({
        type: type || Bun.env.DEFAULT_RUNTIME,
        rom,
        bios,
        core,
        platform,
        redirected
    })}
    `;

    const style = `
    
        html, body, #root {
            height: 100%;
        }

    `;

    return (
        <html>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

                <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png"></link>
                <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png"></link>
                <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png"></link>
                <link rel="manifest" href="assets/site.webmanifest"></link>
                <link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#5bbad5"></link>
                <meta name="apple-mobile-web-app-title" content="RunR"></meta>
                <meta name="application-name" content="RunR"></meta>
                <meta name="msapplication-TileColor" content="#da532c"></meta>
                <meta name="theme-color" content="#ffffff"></meta>

                <script dangerouslySetInnerHTML={{ __html: script }} />
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </head>
            <body style={{ margin: 0, background: 'black', color: 'white' }}>
                <div id="root"></div>
                <script type="module" src="./index.js"></script>
            </body>
        </html>
    );
};
