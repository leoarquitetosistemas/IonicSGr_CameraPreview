import { Component } from '@angular/core';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

//Needed for web registration
import '@capacitor-community/camera-preview';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image = null;
  cameraActive = false;
  //torchActive = false; NOT USED ANYMORE

  constructor() {}

  openCamera(){
    const cameraPreviewOptions:CameraPreviewOptions = {
      position: 'front',
      parent: 'cameraPreview',
      className: 'cameraPreview',
      toBack: true
    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
    this.image = null;
  }

  async stopCamera(){
    await CameraPreview.stop();
    this.cameraActive = false;
  }

  async captureImage(){
    const CameraPreviewPictureOptions: CameraPreviewPictureOptions = {

    };
    const result = await CameraPreview.capture(CameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.stopCamera();
  }
  
  flipCamera(){
    CameraPreview.flip();
  }

}
