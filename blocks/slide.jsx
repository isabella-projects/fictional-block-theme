import apiFetch from '@wordpress/api-fetch';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

registerBlockType('blocktheme/slide', {
    title: 'Slide',
    supports: {
        align: ['full'],
    },
    attributes: {
        themeimage: { type: 'string' },
        align: { type: 'string', default: 'full' },
        imgID: { type: 'number' },
        imgURL: { type: 'string', default: banner.fallbackimage },
    },
    edit: EditComponent,
    save: SaveComponent,
});

function EditComponent(props) {
    useEffect(() => {
        if (props.attributes.themeimage) {
            props.setAttributes({
                themeimage: '',
                imgURL: `${slide.themeimagepath}${props.attributes.themeimage}`,
            });
        }
    }, []);

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
            <div className="hero-slider__slide" style={{ backgroundImage: `url('${props.attributes.imgURL}')` }}>
                <div className="hero-slider__interior container">
                    <div className="hero-slider__overlay t-center">
                        <InnerBlocks allowedBlocks={['blocktheme/genericheading', 'blocktheme/genericbutton']} />
                    </div>
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}
