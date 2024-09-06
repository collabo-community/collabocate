import fs from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const file = {
    createWithContent: ({ targetDirectory, filePathName, content }) => {
        fs.writeFileSync(join(targetDirectory, filePathName), content);
        return;
    },
}

const jsonContent = `{
  "backend_url": "${process.env.BACKEND_URL}"
}
`;

file.createWithContent({
    targetDirectory: './@dev-client',
    filePathName: 'config.generated.json',
    content: jsonContent,
});

