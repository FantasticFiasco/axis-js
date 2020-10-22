export class Generate {
    public static html(content: string): string {
        return `<html>
                    <head>
                        <title>User accounts</title>
                    </head>
                    <body bgcolor=#ffffff>${content}</body>
                </html>`;
    }

    public static string(length: number): string {
        return new Array(length + 1).join('a');
    }
}
