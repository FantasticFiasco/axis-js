/**
 * Snapshot options overriding the video stream configuration. Not specifying any options will
 * get you the characteristics of the video stream.
 */
export interface SnapshotOptions {
    /**
     * Resolution of the returned image. For supported resolutions, check in parameter
     * Properties.Image.Resolution.
     *
     * Remarks: You can always use the npm package axis-configuration to read parameters.
     */
    resolution?: string;
    /**
     * Selects the video source (1...n, "quad"). If omitted the default value camera 1 is used.
     * This argument is only valid for Axis products with more than one video source. That is
     * cameras with multiple view areas and video encoders with multiple video channels.
     */
    camera?: number | 'quad';
    /**
     * Adjusts the compression level (0...100) of the image. Higher values correspond to higher
     * compression, that is lower quality and smaller image size. Note: This value is internally
     * mapped and is therefore product-dependent.
     */
    compression?:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
        | 25
        | 26
        | 27
        | 28
        | 29
        | 30
        | 31
        | 32
        | 33
        | 34
        | 35
        | 36
        | 37
        | 38
        | 39
        | 40
        | 41
        | 42
        | 43
        | 44
        | 45
        | 46
        | 47
        | 48
        | 49
        | 50
        | 51
        | 52
        | 53
        | 54
        | 55
        | 56
        | 57
        | 58
        | 59
        | 60
        | 61
        | 62
        | 63
        | 64
        | 65
        | 66
        | 67
        | 68
        | 69
        | 70
        | 71
        | 72
        | 73
        | 74
        | 75
        | 76
        | 77
        | 78
        | 79
        | 80
        | 81
        | 82
        | 83
        | 84
        | 85
        | 86
        | 87
        | 88
        | 89
        | 90
        | 91
        | 92
        | 93
        | 94
        | 95
        | 96
        | 97
        | 98
        | 99
        | 100;
    /**
     * Rotate the image clockwise (0, 90, 180, 270). The number of rotation alternatives in an Axis
     * product is defined by the parameter Properties.Image.Rotation.
     *
     * Remarks: You can always use the npm package axis-configuration to read parameters.
     */
    rotation?: 0 | 90 | 180 | 270;
    /**
     * The color palette to use in thermal cameras. Applicable if
     * Properties.Image.Palette.StreamPalette=yes or does not exist. See the
     * {link https://www.axis.com/vapix-library/subjects/t10037719/section/t10051895/display?section=t10051895-t10051895-t10051056|VAPIX documentation}
     * for more information.
     */
    palette?: string;
    /**
     * Enable/disable (1, 0) square pixel (aspect ratio) correction. If the parameter is set to 1
     * the Axis product will adjusts the aspect ratio to make it appear as intended.
     */
    squarepixel?: 0 | 1;
}
