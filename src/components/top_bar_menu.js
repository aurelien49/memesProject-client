import React, {Component} from "react";
import {Tabs} from '@mantine/core';
import {IconPhoto, IconMessageCircle, IconSettings} from '@tabler/icons';

class TopBarMenu extends Component {
    onMenuTrigger = {
        that: this,
        async trigger(index) {
            this.that.state.MindexMenuSelected = index;
            // this.that.props.menuAppCallBack(this.that.state.MindexMenuSelected);
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            MindexMenuSelected: "gallery",
        };
    }

    render() {
        return (
            <div>
                <Tabs color="cyan" defaultValue="gallery">
                    <Tabs.List grow>
                        <Tabs.Tab value="gallery" icon={<IconPhoto size={25}/>}
                                  onClick={() => this.onMenuTrigger.trigger("gallery")}
                        >Gallery</Tabs.Tab>
                        <Tabs.Tab value="hystory" icon={<IconPhoto size={25}/>}
                                  onClick={() => this.onMenuTrigger.trigger("historic")}
                        >History</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </div>
        );
    }
}

export default TopBarMenu;