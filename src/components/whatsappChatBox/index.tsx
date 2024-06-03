import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import WhatsappEditor from "../whatsappEditor";
import Emoti from "../whatsappEditor/svgs/emoti.svg";

type Props = {
    value: string
    onChange: (value: any, s: string) => void
    title: string
    max: number
}

const Index:React.FC<Props> = ({value, onChange, title, max}) => {
    const [emojiOpen, setEmojiOpen] = useState(false)
    const htmlToText = (html: string) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }
    const handleEmoji = (value: any, emoji: any) => {
        const doc = htmlToText(value)
        return doc.body.innerText = doc.body.innerText + emoji
    }
    const convertHtml = (html: string) => {
        const parser = new DOMParser();
        const doc = htmlToText(html)

        const boldTags = doc.querySelectorAll('strong');
        boldTags.forEach(tag => {
            tag.innerText = tag.innerText.split(" ").map(item => {
                let manipulateSpace = item.replaceAll(/&nbsp;|\u00A0/g, '')
                if (manipulateSpace.length !== 0) return (`*${item}* `)
            }).join(" ")
        });

        const italicTags = doc.querySelectorAll('i');
        italicTags.forEach(tag => {
            tag.innerText = tag.innerText.split(" ").map(item => {
                let manipulateSpace = item.replaceAll(/&nbsp;|\u00A0/g, '')
                if (manipulateSpace.length !== 0) return (`_${item}_ `)
            }).join(" ")
        });

        const underlineTag = doc.querySelectorAll('u');
        underlineTag.forEach(tag => {
            tag.innerText = tag.innerText.split(" ").map(item => {
                let manipulateSpace = item.replaceAll(/&nbsp;|\u00A0/g, '')
                if (manipulateSpace.length !== 0) return (`~${item}~ `)
            }).join(" ")
        });

        const newLineTags = doc.body.querySelectorAll('br')
        newLineTags.forEach(tag => {
            const textNode = document.createTextNode('\n');
            tag?.parentNode?.insertBefore(textNode, tag);
            tag.remove();
        });
        const paragraphTags = doc.body.querySelectorAll('p')
        doc.body.textContent = Array.from(paragraphTags).map(p => p.textContent).join('\n');


        return doc.body.textContent;
    };

    return (
        <div>
            <div
                style={{display: 'flex'}}>
                <EmojiPicker
                    lazyLoadEmojis={true}
                    onEmojiClick={(e:any) => {
                        const result = handleEmoji(value, e.emoji)
                        onChange(result, convertHtml(result))
                    }}
                    open={emojiOpen}
                />
            </div>
            <fieldset style={{
                border: '1px solid #808080',
                background: "white",
                borderTopRightRadius: '.25rem',
                borderTopLeftRadius: '.25rem',
                padding: '0 .25rem'
            }}>
                <legend
                    style={{
                        fontSize: 12,
                        margin: '0 5px',
                        color: '#808080',
                        padding: '0 8px'
                    }}
                >
                    {title}
                </legend>
                <WhatsappEditor
                    onChange={e => onChange(e, convertHtml(e))}
                    value={value}

                />
            </fieldset>

            <div
                style={{
                    border: '1px solid #808080',
                    borderTop: "none",
                    background: "white",
                    padding: '.25rem 0.75rem',
                    color: '#808080',
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomLeftRadius: '.25rem',
                    borderBottomRightRadius: '.25rem',
                }}>
                <div style={{fontSize: 12}}>
                    <img
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => setEmojiOpen(!emojiOpen)}
                        src={Emoti.src} width={14}
                        height={14} alt="asdas"/>
                </div>
                <div style={{fontSize: 12}}>{value.length}/{max} Karakter</div>
            </div>
        </div>
    );
};

export default Index;