import CMS from "decap-cms-app";
import { DecapCmsMediaLibraryCloudinary } from "decap-cms-media-library-cloudinary";

// Register media library plugin.
CMS.registerMediaLibrary(DecapCmsMediaLibraryCloudinary);

// Initialize the CMS object
CMS.init();