import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, PersistentFile } from "formidable";
import absoluteUrl from 'next-absolute-url'
import { ErrorClass, ErrorEnum } from "../../src/ErrorClass";

declare module 'formidable' {
    interface FileJSON {
        newFilename: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const Error = new ErrorClass(res);
    if (req.method === "POST") {
        const form = new IncomingForm({
            keepExtensions: true,
            uploadDir: './public',
        });
        return new Promise((resolve, reject) => {
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log(err);
                    Error.InternalServerError(err.message);
                    reject(false);
                    return;
                }
                const file = files[Object.keys(files)[0]]
                if (file) {
                    if (file instanceof PersistentFile) {
                        if (fields?.token === process.env.API_SECRET) {
                            const { origin } = absoluteUrl(req);
                            res.status(200).json({
                                message: 'success',
                                url: `${origin}/${file.toJSON().newFilename}`,
                            });
                        } else {
                            file.destroy();
                            Error.Unauthorized('You are not authorized for this endpoint. Please provide a valid token or get support at \'https://api.imageing.org/discord\'.');
                        }
                    } else {
                        console.log(files)
                        Error.InternalServerError('There has been an issue on server side. Please try again or get support at \'https://api.imageing.org/discord\'.');
                    }
                } else {
                    Error.BadRequest('Provide a file to the request body. Please try again or get support at \'https://api.imageing.org/discord\'.');
                }
                resolve(true);
            });
        });
    } else {
        Error.Redirect('/', ErrorEnum.NotImplemented);
    }
}

export const config = {
    api: {
        bodyParser: false,
    }
}