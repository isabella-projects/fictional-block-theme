import apiFetch from '@wordpress/api-fetch';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

registerBlockType('blocktheme/banner', {
    title: 'Banner',
    supports: {
        align: ['full'],
    },
    attributes: {
        align: { type: 'string', default: 'full' },
        imgID: { type: 'number' },
        imgURL: { type: 'string', default: window.banner.fallbackimage },
    },
    edit: EditComponent,
    save: SaveComponent,
});

function EditComponent(props) {
    useEffect(() => {
        if (props.attributes.imgID) {
            async function fetch() {
                const response = await apiFetch({
                    path: `/wp/v2/media/${props.attributes.imgID}`,
                    method: 'GET',
                });

                props.setAttributes({
                    imgURL: response.media_details.sizes.pageBanner.source_url,
                });
            }
            fetch();
        }
    }, [props.attributes.imgID]);

    function onFileSelect(file) {
        props.setAttributes({
            imgID: file.id,
        });
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Background" initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onFileSelect}
                                value={props.attributes.imgID}
                                render={({ open }) => {
                                    return <Button onClick={open}>Choose Image</Button>;
                                }}
                            />
                        </MediaUploadCheck>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div className="page-banner">
                <div className="page-banner__bg-image" style={{ backgroundImage: `url('${props.attributes.imgURL}')` }}></div>
                <div className="page-banner__content container t-center c-white">
                    <InnerBlocks allowedBlocks={['blocktheme/genericheading', 'blocktheme/genericbutton']} />
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}
