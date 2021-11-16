import React from "react";
import { EditorState, convertToRaw, AtomicBlockUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createImagePlugin from '@draft-js-plugins/image'
import createMentionPlugin, {
    defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import editorStyles from "./assets/css/editorStyles.module.scss";
import mentions from "./mentions";
import "draft-js-mention-plugin/lib/plugin.css";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-linkify-plugin/lib/plugin.css";
import { stateToMarkdown } from "draft-js-export-markdown";
import 'draft-js/dist/Draft.css';
import axios from "axios";
import history from "../../history"
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: mentions,
            MAX_LENGTH: 200,
            disabledbtn: true
        };
        this.mentionPlugin = createMentionPlugin();
        this.linkifyPlugin = createLinkifyPlugin();
        this.imagePlugin = createImagePlugin();
    }

    onChange = editorState => {
        this.setState({ editorState });

        const currentContent = this.state.editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;

        if (currentContentLength > 0 && currentContentLength <= this.state.MAX_LENGTH) {
            console.log('you can type max ten characters');
            this.setState({ disabledbtn: false });
        } else {
            this.setState({ disabledbtn: true });
        }

    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions)
        });
    };

    onExtractData = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        console.log(raw);
    };

    onExtractMentions = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        const mentionedUsers = [];
        for (var key in raw.entityMap) {
            const ent = raw.entityMap[key];
            if (ent.type === "mention") {
                mentionedUsers.push(ent.data.mention);
            }
        }
        console.log(mentionedUsers);
    };

    _getLengthOfSelectedText = () => {
        const currentSelection = this.state.editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();

        let length = 0;

        if (!isCollapsed) {
            const currentContent = this.state.editorState.getCurrentContent();
            const startKey = currentSelection.getStartKey();
            const endKey = currentSelection.getEndKey();
            const startBlock = currentContent.getBlockForKey(startKey);
            const isStartAndEndBlockAreTheSame = startKey === endKey;
            const startBlockTextLength = startBlock.getLength();
            const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
            const endSelectedTextLength = currentSelection.getEndOffset();
            const keyAfterEnd = currentContent.getKeyAfter(endKey);
            console.log(currentSelection)
            if (isStartAndEndBlockAreTheSame) {
                length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
            } else {
                let currentKey = startKey;

                while (currentKey && currentKey !== keyAfterEnd) {
                    if (currentKey === startKey) {
                        length += startSelectedTextLength + 1;
                    } else if (currentKey === endKey) {
                        length += endSelectedTextLength;
                    } else {
                        length += currentContent.getBlockForKey(currentKey).getLength() + 1;
                    }

                    currentKey = currentContent.getKeyAfter(currentKey);
                };
            }
        }

        return length;
    }

    _handleBeforeInput = () => {
        const currentContent = this.state.editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = this._getLengthOfSelectedText();

        if (currentContentLength - selectedTextLength > this.state.MAX_LENGTH - 1) {
            console.log('you can type max ten characters');
            return 'handled';
        }
    }

    _handlePastedText = (pastedText) => {
        const currentContent = this.state.editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = this._getLengthOfSelectedText();

        if (currentContentLength + pastedText.length - selectedTextLength > this.state.MAX_LENGTH) {
            console.log('you can type max ten characters');
            return 'handled';
        }
    }

    OnSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_APIURI}/posts`, {
            body: this.state.editorState.getCurrentContent().getPlainText(''),
            user: {
                id: 7,
            }
        })
        await this.setState({ editorState: EditorState.createEmpty() })
        window.location.reload()
    }

    insertImage = (url) => {
        const contentState = this.state.editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            { src: url })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(this.state.editorState, { currentContent: contentStateWithEntity });
        this.onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ''))
    };

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const { ImageAdd } = this.imagePlugin;
        const plugins = [this.mentionPlugin, this.linkifyPlugin, this.imagePlugin];

        return (
            <>
                <form className={editorStyles.form} onSubmit={(e) => this.OnSubmit(e)} >
                    <div className={editorStyles.editor}>
                        <Editor
                            placeholder="Write your post here..."
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={plugins}
                            handleBeforeInput={this._handleBeforeInput}
                            handlePastedText={this._handlePastedText}
                            handlePastedFiles={this._handlePastedFiles}
                        />
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                        />
                        

                        {this.state.disabledbtn ? (
                            <>
                                <div className={editorStyles.submit + " " + editorStyles.disabled}>Post</div>
                            </>
                        ) : (
                            <>
                                <input type="submit" className={editorStyles.submit} value="Post" />
                            </>)}
                    </div>


                </form>
                {this.state.disabledbtn}
            </>
        );
    }
}

export default TextInput;
