import ourColors from '../inc/colors';
import { link } from '@wordpress/icons';
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette } from '@wordpress/components';
import {
    RichText,
    InspectorControls,
    BlockControls,
    __experimentalLinkControl as LinkControl,
    getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';

registerBlockType('blocktheme/genericbutton', {
    title: 'Generic Button',
    attributes: {
        text: {
            type: 'string',
        },
        size: {
            type: 'string',
            default: 'large',
        },
        linkObject: {
            type: 'object',
            default: {
                url: '',
            },
        },
        colorName: {
            type: 'string',
            default: 'blue',
        },
    },
    edit: EditComponent,
    save: SaveComponent,
});

function EditComponent(props) {
    const [isLinkVisible, setLinkVisible] = useState(false);

    function handleTextChange(x) {
        props.setAttributes({
            text: x,
        });
    }

    function buttonHandler() {
        setLinkVisible((prev) => !prev);
    }

    function handleLinkChange(newLink) {
        props.setAttributes({
            linkObject: newLink,
        });
    }

    const currentColorValue = ourColors.filter((color) => {
        return color.name == props.attributes.colorName;
    })[0].color;

    function handleColorChange(colorCode) {
        // We need to find the colorname by the hex value, thanks to WordPress we have getColorObjectByColorValue
        const { name } = getColorObjectByColorValue(ourColors, colorCode);
        props.setAttributes({
            colorName: name,
        });
    }

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={buttonHandler} icon={link} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === 'large'} onClick={() => props.setAttributes({ size: 'large' })}>
                        Large
                    </ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === 'medium'} onClick={() => props.setAttributes({ size: 'medium' })}>
                        Medium
                    </ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === 'small'} onClick={() => props.setAttributes({ size: 'small' })}>
                        Small
                    </ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Color" initialOpen={true}>
                    <PanelRow>
                        <ColorPalette
                            disableCustomColors={true}
                            clearable={false}
                            colors={ourColors}
                            value={currentColorValue}
                            onChange={handleColorChange}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <RichText
                allowedFormats={[]}
                tagName="a"
                className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
                value={props.attributes.text}
                onChange={handleTextChange}
            />
            {isLinkVisible && (
                <Popover position="middle center" onFocusOutside={() => setLinkVisible(false)}>
                    <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
                    <Button variant="primary" onClick={() => setLinkVisible(false)} style={{ display: 'block', width: '100%' }}>
                        Confirm Link
                    </Button>
                </Popover>
            )}
        </>
    );
}

function SaveComponent(props) {
    return (
        <a href={props.attributes.linkObject.url} className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}>
            {props.attributes.text}
        </a>
    );
}
