This is a web application ui component that takes user's pdf file upload and compresses it using a backend service. The frontend is built using React and Vite, while the backend is implemented in Python. The application allows users to easily reduce the size of their PDF files without compromising on quality.

# Design principles
1. **User-Friendly Interface**: The application should have a simple and intuitive interface that allows users to easily upload their PDF files and access the compression features.
2. **Efficient Compression**: The backend service should utilize efficient algorithms to compress PDF files while maintaining a good balance between file size reduction and quality preservation.
3. **Cross-Platform Compatibility**: The application should be compatible with various operating systems and browsers to ensure accessibility for a wide range of users.

# What need to be built
1. First page should have a file drop area and a button to select file from local storage. Once the file is uploaded, it should show the file name and a button to start compression.
2. Once the compression is started, the file should be uploaded to Cloudfare R2 storage and a request should be sent to the backend service to start the compression process.
3. The backend service should process the file and return the compressed file to the frontend, which should then allow the user to download the compressed file.
4. The application should also display the original file size and the compressed file size to give users a clear understanding of the compression results.
5. The page should have a bright theme with a clean and modern design to enhance user experience.

# Expected UI
1. A clean and modern design with a focus on usability.
2. Clear instructions and feedback for users during the file upload and compression process.
3. Visual indicators for file upload progress and compression status.
4. Display of original and compressed file sizes for user reference.
5. On top of the page, it should say "THRJ tools - PDF Compressor".
6. In the middle of the screen, there should be a file drop area with a button to select a file from local storage. Once a file is uploaded, it should show the file name and a button to start compression.
7. After the compression is completed, there should be a download button for the compressed file and a display of the original and compressed file sizes.
8. At the below of the file drop area, there should be a note that says "Note: The compressed file will be stored in Cloudfare R2 storage for 30 min. Please download it within this period. After 30 min, the file will be automatically deleted."

# Expected Functionality
1. The file drop area should allow users to drag and drop their PDF files for upload, as well as provide a button for selecting files from local storage.
2. Upon file upload, the application should display the file name and provide a button to start the compression process.
3. When the compression process is initiated, the application should upload the file to Cloudfare R2 storage and send a request to the backend service to start the compression.
4. The backend service should process the file and return the compressed file link to the frontend, which   should then allow the user to download the compressed file.
5. The application should display the original file size and the compressed file size to give users a clear understanding of the compression results.
6. R2 storage access id and API url will be stored in environment variables for secure access.
7. R2 Access Key ID and Secret Access key will be stored in environment variables for secure access.