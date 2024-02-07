package be.ytbe.external.impl;

import be.ytbe.external.GoogleCloudStorageClient;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class GoogleCloudStorageClientImpl implements GoogleCloudStorageClient {

    @Value("${google.cloud.project-id}")
    private String projectId;

    @Value("${google.cloud.bucket-name}")
    private String bucketName;

    @Value("${google.cloud.credentials.key}")
    private String rawJsonKey;

    public String uploadVideo(byte[] fileBytes) {
        try {
            byte[] jsonKeyBytes = rawJsonKey.getBytes();

            GoogleCredentials credentials = GoogleCredentials.fromStream(new ByteArrayInputStream(jsonKeyBytes));
            Storage storage = StorageOptions.newBuilder()
                    .setProjectId(projectId)
                    .setCredentials(credentials)
                    .build()
                    .getService();

            String videoObjectName = "videos/" + UUID.randomUUID() + ".mp4";

            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, videoObjectName).build();

            Blob blob = storage.create(blobInfo, fileBytes);

            return blob.getMediaLink();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
