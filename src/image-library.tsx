import React, { Component } from 'react';

import { AlertProps } from './alert';
import { ImageLibraryThumbnailList } from './image-library-thumbnail-list';
import ImageUpload from './image-upload';

export interface SGLibraryImage {
  id: string;
  name: string;
  created?: number; // milliseconds since the epoch
  originalUrl?: string; // url of original image before any resize
  thumbnailUrl?: string;
  width?: number; // px
  height?: number; // px
  uploadPercent?: number;
}

export interface ImageLibraryProps {
  maximumImageBytes: number; // current api supports roughly 4.3 MB: 8/17/18
  onUpload: (file: File) => void;
  onUploadFailure?: (msg: string) => void;
  uploadAlert?: React.ReactElement<AlertProps>;
  images: Array<SGLibraryImage>;
}

export interface ImageLibraryState {
  selectedImageId?: string;
}

// add to this when each subcomponent is created
export class ImageLibrary extends Component<
  ImageLibraryProps,
  ImageLibraryState
> {
  public state: ImageLibraryState = {
    selectedImageId: null,
  };

  public render() {
    const { images, maximumImageBytes, uploadAlert } = this.props;

    return (
      <article>
        <ImageUpload
          clearOnDrop
          alert={uploadAlert}
          onFileSelect={this.onFileSelect}
          onInvalidFile={this.onInvalidFile}
          maximumImageBytes={maximumImageBytes}
        />
        <ImageLibraryThumbnailList
          images={images}
          onThumbnailClick={this.onThumbnailClick}
          selectedImageId={this.state.selectedImageId}
        />
      </article>
    );
  }

  private onThumbnailClick = (selectedImageId: string) => {
    this.setState({ selectedImageId });
  };

  private onFileSelect = (files: FileList) => {
    const { onUpload } = this.props;
    onUpload(files[0]);
  };

  private onInvalidFile = (files: FileList) => {
    const { onUploadFailure } = this.props;
    if (onUploadFailure) {
      onUploadFailure(ERROR_CODES.FILE_SIZE);
    }
  };
}

export const ERROR_CODES = {
  FILE_SIZE: 'imageLibrary.errors.fileSize',
};

export default ImageLibrary;
