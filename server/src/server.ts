import { app as app} from './app'
import http from 'http';
// Interface for API details


const PORT = parseInt(process.env.PORT || '3000', 10); // Ensure PORT is a number

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
