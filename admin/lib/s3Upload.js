let router = require('express').Router();
let config = require('../config/config');
let request = require('request');

// let awsconfig = config.aws_config;

const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const { mime } = require("mime-types");

const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3Client = new S3Client({
    /*credentials: {
        accessKeyId: awsconfig.accessKeyId,
        secretAccessKey: awsconfig.secretAccessKey,
    },*/
    region: 'ap-south-1'
});

const bucket_name = (config.baseUrl == "https://localhost:8083") ? "images-prod" : "images-dev";

module.exports.s3FileUpload = async function(fileData,fileName,fileType="application/pdf") {
    return new Promise(async(resolve) => {
        try {
            // let replaceFile = fileData.replace(/^data:image\/\w+;base64,/, '')
            // let file_data = Buffer.from(replaceFile, 'base64')
            // const mimeType = mime.lookup(filePath) || "image/jpeg"; 

            const target = { 
                // Bucket: awsconfig.bucket,
                Bucket: bucket_name,
                Key: fileName, 
                Body: fileData,
                ContentType: fileType,
                // ContentDisposition: "inline" // Open in browser instead of download
                // ContentType: mimeType,
                // ACL: "public-read", // Optional: Make it public if needed 
            };
            
            const parallelUploads3 = new Upload({
                client: s3Client,
                params: target,
            });

            parallelUploads3.on("httpUploadProgress", (progress) => {
                // console.log(progress);
            });

            let data = await parallelUploads3.done();
            console.log('File uploaded on S3 successfully!');
            // console.log("S3 File Upload Response", data);
            
            let fileKey = (data.Key) ? data.Key : '';
            resolve(fileKey)

        } catch (e) {
          console.log("Error in S3 upload : ", e.message)
          resolve(false)
        }
    })
}

module.exports.getSignedUrl =  async function(file_key) {
    return new Promise(async(resolve) => {
        if(file_key){
            try {
                const command = new GetObjectCommand({
                    // Bucket: awsconfig.bucket,
                    Bucket: bucket_name,
                    Key:file_key,
                    // ResponseContentType: "application/pdf",  // Ensure correct MIME type
                    // ResponseContentDisposition: "inline", // Ensure it opens in browser
                });

                const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 7 days (max limit) 604800 3600
                // console.log("S3 Signed Url ", signedUrl)

                resolve(signedUrl)
            } catch (e) {
                console.log("Something went wrong")
                resolve(false)
            }
        } else{
            console.log("Invalid file")
            resolve(false)
        }
    })
}

module.exports.multerS3Upload = async function(req) {
    let mlUpload = multer({
        storage: multerS3({
            s3: s3Client,
            // bucket: awsconfig.bucket,
            bucket: bucket_name,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            contentDisposition: "inline",
            key: (req, file, callback) => {
                /*if (req.field_name != file.fieldname) {
                    callback(new Error("Please choose proper file field name"), false);
                }*/
                if(file.fieldname == "estimate_file" && !["application/pdf","text/pdf"].includes(file.mimetype)) {
                    callback(new Error('Please upload a PDF format file'), file.originalname);
                }
                file.originalname = file.originalname.replace(/\s/g, "_");
                // console.log("test mime type ", file.mimetype)
                const allowedTypes = ["image/*", "image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/heic", "image/svg", "image/svg+xml", "image/tiff", "application/pdf", "text/pdf"];
                if (allowedTypes.includes(file.mimetype)) {
                    const file_name = `${req.file_path}/${Date.now()}_${file.originalname}`;
                    callback(null, file_name);
                } else {
                    callback(new Error('Please upload only images or PDFs'), file.originalname);
                }
            },
            fileFilter: function (req, file, callback) {
                /*if (file.mimetype === "application/pdf") {
                    callback(null, true);
                } else {
                    callback(new Error("Only PDF files are allowed"), false);
                }*/
            }
        })
    });
    return mlUpload;
}