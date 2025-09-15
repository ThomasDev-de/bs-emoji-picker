(function ($) {
    'use strict';
    $.bsEmojiPicker = {
        version: '0.0.1',
        defaults: {
            btnClass: 'btn btn-outline-secondary',
            btnIconClass: 'bi bi-emoji-smile',
            targetInput: undefined,
            labels: {
                classics: "Classics",
                slackDiscordFaces: "Slack/Discord Faces",
                heartsAndLove: "Hearts & Love",
                handsAndGestures: "Hands & Gestures",
                symbolsAndObjects: "Symbols & Objects",
                animalsAndNature: "Animals & Nature",
            },
            onClickEmoji(emoji) {
                return emoji;
            },
        },
        map: {
            heartsAndLove: [
                {re: /<\/3/g, emoji: "💔"},
                {re: /<3/g, emoji: "❤️"},
                {re: /:heart:/gi, emoji: "❤️"},
                {re: /:hearts:/gi, emoji: "❤️"},
                {re: /:sparkling_heart:/gi, emoji: "💖"},
                {re: /:two_hearts:/gi, emoji: "💕"},
                {re: /:revolving_hearts:/gi, emoji: "💞"},
                {re: /:heartbeat:/gi, emoji: "💓"},
                {re: /:heartpulse:/gi, emoji: "💗"},
                {re: /:growing_heart:/gi, emoji: "💗"},
                {re: /:heart_decoration:/gi, emoji: "💟"},
                {re: /:heart_exclamation:/gi, emoji: "❣️"},
                {re: /:cupid:/gi, emoji: "💘"},
                {re: /:heart_with_ribbon:|:gift_heart:/gi, emoji: "💝"},
                {re: /:love_letter:/gi, emoji: "💌"},
                {re: /:kiss_mark:|:kiss:/gi, emoji: "💋"},
                {re: /:blue_heart:/gi, emoji: "💙"},
                {re: /:green_heart:/gi, emoji: "💚"},
                {re: /:yellow_heart:/gi, emoji: "💛"},
                {re: /:purple_heart:/gi, emoji: "💜"},
                {re: /:black_heart:/gi, emoji: "🖤"},
                {re: /:white_heart:/gi, emoji: "🤍"},
                {re: /:orange_heart:/gi, emoji: "🧡"},
                {re: /:brown_heart:/gi, emoji: "🤎"},
                {re: /:mending_heart:/gi, emoji: "❤️‍🩹"},
                {re: /:heart_on_fire:/gi, emoji: "❤️‍🔥"}
            ],
            classics: [
                {re: /:-D|:D|=D|xD|XD/gi, emoji: "😁"},
                {re: /:'-D|:'D/gi, emoji: "😂"},
                {re: /:-\)|:\)|=\)|:]|=]|:\^\)|\(=:|\(-:/g, emoji: "🙂"},
                {re: /:-\(|:\(|=\(|:\[|=\[/g, emoji: "🙁"},
                {re: /D:/g, emoji: "😧"},
                {re: /:-O|:O|:-o|:o/gi, emoji: "😮"},
                {re: /:-0|:0/g, emoji: "😮"},
                {re: /:-\*|:\*/g, emoji: "😘"},
                {re: /\^_\^/g, emoji: "😊"},
                {re: /;-?\)|;-?D/g, emoji: "😉"},
                {re: /:-P|:P|=-P|=-p|:p/gi, emoji: "😛"},
                {re: /:-S|:S/gi, emoji: "😖"},
                {re: /:-\||:\|/g, emoji: "😐"},
                {re: />:-\(|>:\(/g, emoji: "😠"},
                {re: />:-\)|>:\)/g, emoji: "😈"},
                {re: /O:-\)|0:-\)/g, emoji: "😇"},
                {re: /-_-|\.__\./g, emoji: "😴"},
                {re: /:'-\(|:'\(/g, emoji: "😢"},
                {re: /T_T|;_;|QQ/g, emoji: "😭"},
                {re: /:-X|:X/gi, emoji: "🤐"},
                {re: /:-\$|:\$/g, emoji: "😳"},
                {re: /:-]|:]/g, emoji: "🙂"},
                {re: /:-</g, emoji: "☹️"},
                {re: /:shrug:|¯\\_\(ツ\)_\/¯/g, emoji: "🤷"},
                {re: /:facepalm:/gi, emoji: "🤦"},
                {re: /:mindblown:|:exploding_head:/gi, emoji: "🤯"},
                {re: /:thinking:|:-\?|\?_o/gi, emoji: "🤔"},
                {re: /B-?\)|b-?\)/g, emoji: "😎"}
            ],
            handsAndGestures: [
                {re: /:thumbsup:|:\+1:|:like:/gi, emoji: "👍"},
                {re: /:thumbsdown:|:-1:/gi, emoji: "👎"},
                {re: /:clap:/gi, emoji: "👏"},
                {re: /:pray:|:folded_hands:/gi, emoji: "🙏"},
                {re: /:wave:|:waving_hand:/gi, emoji: "👋"},
                {re: /:handshake:/gi, emoji: "🤝"},
                {re: /:ok_hand:|:ok:/gi, emoji: "👌"},
                {re: /:muscle:/gi, emoji: "💪"},
                {re: /:pinch:|:pinching_hand:/gi, emoji: "🤌"},
                {re: /:fingers_crossed:/gi, emoji: "🤞"},
                {re: /:love_you_gesture:/gi, emoji: "🤟"},
                {re: /:metal:|:sign_of_the_horns:/gi, emoji: "🤘"},
                {re: /:v:|:victory_hand:/gi, emoji: "✌️"},
                {re: /:call_me:|:call_me_hand:/gi, emoji: "🤙"},
                {re: /:raised_hand:|:hand:/gi, emoji: "✋"},
                {re: /:raised_back_of_hand:/gi, emoji: "🤚"},
                {re: /:hand_splayed:|:raised_hand_with_fingers_splayed:/gi, emoji: "🖐️"},
                {re: /:vulcan:|:vulcan_salute:/gi, emoji: "🖖"},
                {re: /:writing_hand:/gi, emoji: "✍️"},
                {re: /:index_pointing_up:|:point_up:/gi, emoji: "☝️"},
                {re: /:point_up_2:|:backhand_index_pointing_up:/gi, emoji: "👆"},
                {re: /:point_down:|:backhand_index_pointing_down:/gi, emoji: "👇"},
                {re: /:point_left:|:backhand_index_pointing_left:/gi, emoji: "👈"},
                {re: /:point_right:|:backhand_index_pointing_right:/gi, emoji: "👉"},
                {re: /:index_pointing_at_the_viewer:|:point_at:/gi, emoji: "🫵"},
                {re: /:open_hands:/gi, emoji: "👐"},
                {re: /:palms_up:|:palms_up_together:/gi, emoji: "🤲"},
                {re: /:palm_up_hand:/gi, emoji: "🫴"},
                {re: /:palm_down_hand:/gi, emoji: "🫳"},
                {re: /:raised_fist:|:fist:/gi, emoji: "✊"},
                {re: /:oncoming_fist:|:fist_right:/gi, emoji: "👊"},
                {re: /:left_facing_fist:|:fist_left:/gi, emoji: "🤛"},
                {re: /:right_facing_fist:/gi, emoji: "🤜"},
            ],
            symbolsAndObjects: [
                {re: /:star:/gi, emoji: "⭐"},
                {re: /:sparkles:/gi, emoji: "✨"},
                {re: /:fire:/gi, emoji: "🔥"},
                {re: /:boom:|:collision:/gi, emoji: "💥"},
                {re: /:tada:/gi, emoji: "🎉"},
                {re: /:rocket:/gi, emoji: "🚀"},
                {re: /:eyes:/gi, emoji: "👀"},
                {re: /:100:/g, emoji: "💯"},
                {re: /:check:|:white_check_mark:/gi, emoji: "✅"},
                {re: /:x:|:cross_mark:/gi, emoji: "❌"},
                {re: /:bulb:|:idea:/gi, emoji: "💡"},
                {re: /:warning:/gi, emoji: "⚠️"},
                {re: /:question:/gi, emoji: "❓"},
                {re: /:exclamation:/gi, emoji: "❗"},
                {re: /:poop:|:pile_of_poo:/gi, emoji: "💩"},
                {re: /:gift:/gi, emoji: "🎁"},
                {re: /:link:/gi, emoji: "🔗"},
                {re: /:pushpin:/gi, emoji: "📌"},
                {re: /:paperclip:/gi, emoji: "📎"},
                {re: /:bookmark:/gi, emoji: "🔖"},
                {re: /:label:|:tag:/gi, emoji: "🏷️"},
                {re: /:ticket:/gi, emoji: "🎟️"},
                {re: /:trophy:/gi, emoji: "🏆"},
                {re: /:medal:/gi, emoji: "🏅"},
                {re: /:target:|:dart:/gi, emoji: "🎯"},
                {re: /:chart_up:|:chart_increasing:/gi, emoji: "📈"},
                {re: /:chart_down:|:chart_decreasing:/gi, emoji: "📉"},
                {re: /:bar_chart:|:chart:/gi, emoji: "📊"},
                {re: /:calendar:/gi, emoji: "📅"},
                {re: /:date:/gi, emoji: "📆"},
                {re: /:clock:/gi, emoji: "🕒"},
                {re: /:alarm_clock:/gi, emoji: "⏰"},
                {re: /:timer:/gi, emoji: "⏱️"},
                {re: /:hourglass:/gi, emoji: "⌛"},
                {re: /:phone:|:telephone:/gi, emoji: "☎️"},
                {re: /:mobile:|:smartphone:/gi, emoji: "📱"},
                {re: /:laptop:/gi, emoji: "💻"},
                {re: /:desktop:/gi, emoji: "🖥️"},
                {re: /:keyboard:/gi, emoji: "⌨️"},
                {re: /:printer:/gi, emoji: "🖨️"},
                {re: /:battery:/gi, emoji: "🔋"},
                {re: /:plug:/gi, emoji: "🔌"},
                {re: /:email:|:envelope:/gi, emoji: "✉️"},
                {re: /:inbox:/gi, emoji: "📥"},
                {re: /:outbox:/gi, emoji: "📤"},
                {re: /:package:/gi, emoji: "📦"},
                {re: /:shopping_cart:/gi, emoji: "🛒"},
                {re: /:moneybag:/gi, emoji: "💰"},
                {re: /:dollar:/gi, emoji: "💵"},
                {re: /:euro:/gi, emoji: "💶"},
                {re: /:pound:/gi, emoji: "💷"},
                {re: /:yen:/gi, emoji: "💴"},
                {re: /:credit_card:/gi, emoji: "💳"},
                {re: /:lock:/gi, emoji: "🔒"},
                {re: /:unlock:/gi, emoji: "🔓"},
                {re: /:key:/gi, emoji: "🔑"},
                {re: /:hammer:/gi, emoji: "🔨"},
                {re: /:wrench:/gi, emoji: "🔧"},
                {re: /:gear:/gi, emoji: "⚙️"},
                {re: /:magnet:/gi, emoji: "🧲"},
                {re: /:syringe:/gi, emoji: "💉"},
                {re: /:pill:/gi, emoji: "💊"},
                {re: /:camera:/gi, emoji: "📷"},
                {re: /:video_camera:/gi, emoji: "📹"},
                {re: /:movie_camera:/gi, emoji: "🎥"},
                {re: /:clapper:/gi, emoji: "🎬"},
                {re: /:headphones:/gi, emoji: "🎧"},
                {re: /:microphone:/gi, emoji: "🎤"},
                {re: /:speaker:/gi, emoji: "🔈"},
                {re: /:loud_sound:/gi, emoji: "🔊"},
                {re: /:mute:/gi, emoji: "🔇"},
                {re: /:bell:/gi, emoji: "🔔"},
                {re: /:no_bell:/gi, emoji: "🔕"},
                {re: /:music:/gi, emoji: "🎵"},
                {re: /:notes:/gi, emoji: "🎶"},
                {re: /:book:/gi, emoji: "📖"},
                {re: /:notebook:/gi, emoji: "📓"},
                {re: /:ledger:/gi, emoji: "📒"},
                {re: /:bookmark_tabs:/gi, emoji: "📑"},
                {re: /:clipboard:/gi, emoji: "📋"},
                {re: /:pencil:/gi, emoji: "✏️"},
                {re: /:pen:/gi, emoji: "🖊️"},
                {re: /:paintbrush:/gi, emoji: "🖌️"},
                {re: /:scissors:/gi, emoji: "✂️"},
                {re: /:wastebasket:|:trash:/gi, emoji: "🗑️"},
                {re: /:folder:/gi, emoji: "📁"},
                {re: /:open_folder:/gi, emoji: "📂"},
                {re: /:file:/gi, emoji: "📄"},
                {re: /:newspaper:/gi, emoji: "📰"},
                {re: /:globe:/gi, emoji: "🌐"},
                {re: /:map:/gi, emoji: "🗺️"},
                {re: /:compass:/gi, emoji: "🧭"},
                {re: /:pin:|:round_pushpin:/gi, emoji: "📍"},
            ],
            animalsAndNature: [
                {re: /:cat:/gi, emoji: "🐱"},
                {re: /:dog:/gi, emoji: "🐶"},
                {re: /:mouse:/gi, emoji: "🐭"},
                {re: /:hamster:/gi, emoji: "🐹"},
                {re: /:rabbit:/gi, emoji: "🐰"},
                {re: /:fox:/gi, emoji: "🦊"},
                {re: /:bear:/gi, emoji: "🐻"},
                {re: /:panda:/gi, emoji: "🐼"},
                {re: /:koala:/gi, emoji: "🐨"},
                {re: /:tiger:/gi, emoji: "🐯"},
                {re: /:lion:/gi, emoji: "🦁"},
                {re: /:leopard:/gi, emoji: "🐆"},
                {re: /:cow:/gi, emoji: "🐮"},
                {re: /:ox:/gi, emoji: "🐂"},
                {re: /:water_buffalo:/gi, emoji: "🐃"},
                {re: /:bison:/gi, emoji: "🦬"},
                {re: /:bull:/gi, emoji: "🐂"},
                {re: /:buffalo:/gi, emoji: "🐃"},
                {re: /:boar:/gi, emoji: "🐗"},
                {re: /:pig:/gi, emoji: "🐷"},
                {re: /:pig_nose:/gi, emoji: "🐽"},
                {re: /:ram:/gi, emoji: "🐏"},
                {re: /:sheep:/gi, emoji: "🐑"},
                {re: /:goat:/gi, emoji: "🐐"},
                {re: /:deer:/gi, emoji: "🦌"},
                {re: /:camel:/gi, emoji: "🐪"},
                {re: /:two_hump_camel:/gi, emoji: "🐫"},
                {re: /:llama:/gi, emoji: "🦙"},
                {re: /:giraffe:/gi, emoji: "🦒"},
                {re: /:zebra:/gi, emoji: "🦓"},
                {re: /:elephant:/gi, emoji: "🐘"},
                {re: /:rhinoceros:/gi, emoji: "🦏"},
                {re: /:hippopotamus:/gi, emoji: "🦛"},
                {re: /:horse:/gi, emoji: "🐴"},
                {re: /:racehorse:/gi, emoji: "🐎"},
                {re: /:unicorn:/gi, emoji: "🦄"},
                {re: /:kangaroo:/gi, emoji: "🦘"},
                {re: /:sloth:/gi, emoji: "🦥"},
                {re: /:otter:/gi, emoji: "🦦"},
                {re: /:skunk:/gi, emoji: "🦨"},
                {re: /:beaver:/gi, emoji: "🦫"},
                {re: /:badger:/gi, emoji: "🦡"},
                {re: /:hedgehog:/gi, emoji: "🦔"},
                {re: /:bat:/gi, emoji: "🦇"},
                {re: /:monkey:/gi, emoji: "🐒"},
                {re: /:monkey_face:/gi, emoji: "🐵"},
                {re: /:gorilla:/gi, emoji: "🦍"},
                {re: /:orangutan:/gi, emoji: "🦧"},
                {re: /:chicken:/gi, emoji: "🐔"},
                {re: /:rooster:/gi, emoji: "🐓"},
                {re: /:hatching_chick:/gi, emoji: "🐣"},
                {re: /:baby_chick:/gi, emoji: "🐤"},
                {re: /:bird:/gi, emoji: "🐦"},
                {re: /:penguin:/gi, emoji: "🐧"},
                {re: /:dove:/gi, emoji: "🕊️"},
                {re: /:eagle:/gi, emoji: "🦅"},
                {re: /:duck:/gi, emoji: "🦆"},
                {re: /:swan:/gi, emoji: "🦢"},
                {re: /:owl:/gi, emoji: "🦉"},
                {re: /:peacock:/gi, emoji: "🦚"},
                {re: /:parrot:/gi, emoji: "🦜"},
                {re: /:flamingo:/gi, emoji: "🦩"},
                {re: /:dodo:/gi, emoji: "🦤"},
                {re: /:turkey:/gi, emoji: "🦃"},
                {re: /:butterfly:/gi, emoji: "🦋"},
                {re: /:bee:|:honeybee:/gi, emoji: "🐝"},
                {re: /:beetle:/gi, emoji: "🐞"},
                {re: /:lady_beetle:/gi, emoji: "🐞"},
                {re: /:ant:/gi, emoji: "🐜"},
                {re: /:bug:/gi, emoji: "🐛"},
                {re: /:cricket:/gi, emoji: "🦗"},
                {re: /:spider:/gi, emoji: "🕷️"},
                {re: /:scorpion:/gi, emoji: "🦂"},
                {re: /:mosquito:/gi, emoji: "🦟"},
                {re: /:fly:/gi, emoji: "🪰"},
                {re: /:cockroach:/gi, emoji: "🪳"},
                {re: /:worm:/gi, emoji: "🪱"},
                {re: /:snail:/gi, emoji: "🐌"},
                {re: /:microbe:/gi, emoji: "🦠"},
                {re: /:turtle:/gi, emoji: "🐢"},
                {re: /:snake:/gi, emoji: "🐍"},
                {re: /:lizard:/gi, emoji: "🦎"},
                {re: /:sauropod:/gi, emoji: "🦕"},
                {re: /:t_rex:|:trex:/gi, emoji: "🦖"},
                {re: /:dragon:/gi, emoji: "🐉"},
                {re: /:whale:/gi, emoji: "🐋"},
                {re: /:dolphin:/gi, emoji: "🐬"},
                {re: /:fish:/gi, emoji: "🐟"},
                {re: /:tropical_fish:/gi, emoji: "🐠"},
                {re: /:blowfish:/gi, emoji: "🐡"},
                {re: /:shark:/gi, emoji: "🦈"},
                {re: /:octopus:/gi, emoji: "🐙"},
                {re: /:squid:/gi, emoji: "🦑"},
                {re: /:shrimp:/gi, emoji: "🦐"},
                {re: /:lobster:/gi, emoji: "🦞"},
                {re: /:crab:/gi, emoji: "🦀"},
                {re: /:seal:/gi, emoji: "🦭"},
                {re: /:jellyfish:/gi, emoji: "🪼"},
                {re: /:coral:/gi, emoji: "🪸"},
                {re: /:paw_prints?:/gi, emoji: "🐾"},
            ],
            slackDiscordFaces: [
                {re: /:smile:/gi, emoji: "😄"},
                {re: /:smiley:/gi, emoji: "😃"},
                {re: /:grin:/gi, emoji: "😁"},
                {re: /:joy:/gi, emoji: "😂"},
                {re: /:rofl:/gi, emoji: "🤣"},
                {re: /:sweat_smile:/gi, emoji: "😅"},
                {re: /:laughing:|:satisfied:/gi, emoji: "😆"},
                {re: /:wink:/gi, emoji: "😉"},
                {re: /:blush:/gi, emoji: "😊"},
                {re: /:slight_smile:/gi, emoji: "🙂"},
                {re: /:upside_down:/gi, emoji: "🙃"},
                {re: /:smirk:/gi, emoji: "😏"},
                {re: /:star_struck:/gi, emoji: "🤩"},
                {re: /:heart_eyes:/gi, emoji: "😍"},
                {re: /:kissing_heart:/gi, emoji: "😘"},
                {re: /:kiss:/gi, emoji: "😗"},
                {re: /:kissing:/gi, emoji: "😗"},
                {re: /:kissing_smiling_eyes:/gi, emoji: "😙"},
                {re: /:kissing_closed_eyes:/gi, emoji: "😚"},
                {re: /:relaxed:/gi, emoji: "☺️"},
                {re: /:yum:/gi, emoji: "😋"},
                {re: /:stuck_out_tongue:/gi, emoji: "😛"},
                {re: /:stuck_out_tongue_winking_eye:/gi, emoji: "😜"},
                {re: /:stuck_out_tongue_closed_eyes:/gi, emoji: "😝"},
                {re: /:neutral_face:/gi, emoji: "😐"},
                {re: /:expressionless:/gi, emoji: "😑"},
                {re: /:unamused:/gi, emoji: "😒"},
                {re: /:rolling_eyes:/gi, emoji: "🙄"},
                {re: /:thinking_face:/gi, emoji: "🤔"},
                {re: /:zipper_mouth_face:/gi, emoji: "🤐"},
                {re: /:shushing_face:/gi, emoji: "🤫"},
                {re: /:lying_face:/gi, emoji: "🤥"},
                {re: /:relieved:/gi, emoji: "😌"},
                {re: /:pensive:/gi, emoji: "😔"},
                {re: /:sleepy:/gi, emoji: "😪"},
                {re: /:sleeping:/gi, emoji: "😴"},
                {re: /:hugging:/gi, emoji: "🤗"},
                {re: /:face_with_raised_eyebrow:/gi, emoji: "🤨"},
                {re: /:hushed:/gi, emoji: "😯"},
                {re: /:astonished:/gi, emoji: "😲"},
                {re: /:flushed:/gi, emoji: "😳"},
                {re: /:pleading_face:/gi, emoji: "🥺"},
                {re: /:confounded:/gi, emoji: "😖"},
                {re: /:persevere:/gi, emoji: "😣"},
                {re: /:disappointed_relieved:/gi, emoji: "😥"},
                {re: /:cold_sweat:/gi, emoji: "😰"},
                {re: /:fearful:/gi, emoji: "😨"},
                {re: /:weary:/gi, emoji: "😩"},
                {re: /:tired_face:/gi, emoji: "😫"},
                {re: /:scream:/gi, emoji: "😱"},
                {re: /:angry:/gi, emoji: "😠"},
                {re: /:rage:/gi, emoji: "😡"},
                {re: /:cry:/gi, emoji: "😢"},
                {re: /:sob:/gi, emoji: "😭"},
                {re: /:worried:/gi, emoji: "😟"},
                {re: /:frowning:/gi, emoji: "☹️"},
                {re: /:grimacing:/gi, emoji: "😬"},
                {re: /:sunglasses:/gi, emoji: "😎"},
                {re: /:nerd_face:/gi, emoji: "🤓"},
                {re: /:cowboy:/gi, emoji: "🤠"},
                {re: /:clown:/gi, emoji: "🤡"},
                {re: /:monocle_face:/gi, emoji: "🧐"},
                {re: /:mask:/gi, emoji: "😷"},
                {re: /:face_with_thermometer:/gi, emoji: "🤒"},
                {re: /:face_with_head_bandage:/gi, emoji: "🤕"},
                {re: /:nauseated_face:/gi, emoji: "🤢"},
                {re: /:face_vomiting:/gi, emoji: "🤮"},
                {re: /:sneezing_face:/gi, emoji: "🤧"},
                {re: /:hot_face:/gi, emoji: "🥵"},
                {re: /:cold_face:/gi, emoji: "🥶"},
                {re: /:woozy_face:/gi, emoji: "🥴"},
                {re: /:partying_face:/gi, emoji: "🥳"},
                {re: /:mindblown:|:exploding_head:/gi, emoji: "🤯"},
            ],
        },
        globalEvents: false
    };

    $.bsEmojiPicker.emojify = function(text) {
        // Beispielverarbeitung, z. B. Emoji-Ersetzungen
        return pluginMethods.emojify(text);
    };

    const pluginFunctions = {
        setSettings($wrapper, settings) {
            $wrapper.data('bsEmojiPicker', settings);
        },
        getSettings($wrapper) {
            return $wrapper.data('bsEmojiPicker') ?? null;
        },
        getDropdown($wrapper) {
            return $wrapper.find('.dropdown-emoji');
        },
        buildDropdown($wrapper) {
            const settings = this.getSettings($wrapper);

            const index = $('body').find('.dropdown-emoji.dropdown-emoji').length + 1;
            $wrapper.empty();
            const inInputGroup = $wrapper.closest('.input-group').length > 0;

            // the dropdown wrapper element

            const $dropdown = $('<div>', {
                class: `dropdown dropdown-emoji`,
                'data-index': index,
            }).appendTo($wrapper);

            // the dropdown-toggle element
            const $dropdownToggle = $('<button>', {
                class: settings.btnClass + ' dropdown-toggle',
                type: 'button',
                'data-bs-toggle': 'dropdown',
                'aria-expanded': 'false',
                html: `<i class="${settings.btnIconClass}"></i>`,
            }).appendTo($dropdown);

            const $dropdownMenu = $('<div>', {
                class: 'dropdown-menu p-0',

            }).appendTo($dropdown);

            const $dropdownSearch = $('<div>', {
                class: 'dropdown-search d-flex align-items-center flex-nowrap p-1',
            }).appendTo($dropdownMenu);
            const $dropdownSearchInput = $('<input>', {
                class: 'form-control',
                type: 'search',
                placeholder: 'Search',
            }).appendTo($dropdownSearch);
            const $dropdownSearchClear = $('<button>', {
                class: 'btn btn-link dropdown-search-clear',
                type: 'button',
                html: '<i class="bi bi-x-lg"></i>',
            }).appendTo($dropdownSearch);

            const $iconWrapper = $('<div>', {
                class: 'dropdown-emoji-menu-wrapper',
                style: 'min-width: 340px; max-width: 520px; max-height: 400px; overflow-y: auto;',
            }).appendTo($dropdownMenu);

            this.fillDropdown($wrapper);

        },
        fillDropdown($wrapper) {
            const settings = this.getSettings($wrapper);
            const $dropdown = this.getDropdown($wrapper);
            const $dropdownMenu = $dropdown.find('.dropdown-menu').find('.dropdown-emoji-menu-wrapper');
            const EMOJI_MAP = $.bsEmojiPicker.map;
            const LABELS = settings.labels;
            const ORDER = Object.keys(settings.labels);

            // Build an index from EMOJI_MAP -> [{label, items:[{emoji, patterns:string[]}, ...]}] in label order
            function buildIndex() {
                const result = [];

                const pushCategory = (key, label) => {
                    const arr = EMOJI_MAP[key] || [];
                    const byEmoji = new Map(); // emoji => { emoji, patterns:Set }
                    for (const entry of arr) {
                        const emoji = entry?.emoji;
                        const re = entry?.re;
                        if (!emoji || !re) continue;
                        const pat = String(re.source || re).trim(); // e.g. ":-\\)|:\\)"
                        if (!byEmoji.has(emoji)) byEmoji.set(emoji, {emoji, patterns: new Set()});
                        byEmoji.get(emoji).patterns.add(pat);
                    }
                    const items = Array.from(byEmoji.values()).map(x => ({
                        emoji: x.emoji,
                        patterns: Array.from(x.patterns) // array of pattern strings
                    }));
                    result.push({key, label, items});
                };

                // Ordered categories first
                for (const key of ORDER) {
                    pushCategory(key, LABELS[key] || key);
                }
                // Any remaining (not in ORDER)
                const remaining = Object.keys(EMOJI_MAP).filter(k => !ORDER.includes(k))
                    .map(k => ({k, l: LABELS[k] || k}))
                    .sort((a, b) => a.l.localeCompare(b.l));
                for (const {k, l} of remaining) {
                    pushCategory(k, l);
                }

                return result;
            }

            const INDEX = buildIndex();

            function renderSections(query = "") {
                const q = (query || "").toLowerCase().trim();
                $dropdownMenu.empty();

                let anyShown = false;

                INDEX.forEach(({label, items}) => {
                    // Filter items by pattern text
                    const list = q
                        ? items.filter(it =>
                            it.patterns.some(p => p.toLowerCase().includes(q))
                        )
                        : items;

                    if (!list.length) return;
                    anyShown = true;

                    // Header
                    const $header = $('<div>', {
                        class: 'dropdown-header sticky-top text-bg-light',
                        text: label,
                    }).appendTo($dropdownMenu);

                    // Icons grid (links ausgerichtet, ohne verteilte letzte Reihe)
                    const $grid = $('<div>', {
                        class: 'd-flex flex-wrap gap-1 px-1',
                    }).appendTo($dropdownMenu);
                    list.forEach(({emoji, patterns}) => {
                        const $span = $('<span>', {
                            class: 'd-inline-flex justify-content-center align-items-center border-0 rounded js-emoji-insert',
                            style: 'cursor:pointer; width:2rem; height:2rem; font-size:18px;',
                            'data-emoji': emoji,
                            // Zeige die zugehörigen Shortcodes im Tooltip (z. B. ":-) | :) | (=:")
                            title: patterns.join("  |  "),
                            text: emoji,
                        }).appendTo($grid);
                    });
                });

                if (!anyShown) {
                    const $empty = $('<div>', {
                        class: 'text-muted small px-2 py-1',
                        text: "No matches",
                    }).appendTo($dropdownMenu);
                }
            }

            renderSections();
        },
        emojifyTarget($target) {
            if (!$target || !$($target).length) {
                return new Error('Invalid target');
            }
            const $input = $($target); // jQuery-Objekt aus dem Zieltextfeld
            const value = $input.val(); // Textfeldinhalt abrufen
            const start = $input.prop('selectionStart') ?? value.length; // Startposition der Auswahl
            const end = $input.prop('selectionEnd') ?? value.length; // Endposition der Auswahl

            const before = value.slice(0, start);
            const middle = value.slice(start, end);
            const after = value.slice(end);

            const beforeRepl = $.bsEmojiPicker.emojify(before); // Emoji-Ersetzungen vor der Auswahl
            const middleRepl = $.bsEmojiPicker.emojify(middle); // Emoji-Ersetzungen innerhalb der Auswahl
            const afterRepl = $.bsEmojiPicker.emojify(after); // Emoji-Ersetzungen nach der Auswahl

            const newValue = beforeRepl + middleRepl + afterRepl;

            if (newValue !== value) {
                $input.val(newValue); // Neuen Wert im Textfeld setzen
                const newEnd = beforeRepl.length + middleRepl.length; // Neue Cursor-Position berechnen
                $input.prop('selectionStart', newEnd); // Auswahl-Start aktualisieren
                $input.prop('selectionEnd', newEnd); // Auswahl-Ende aktualisieren
            }
        },
        emojify(str) {
            if (typeof str !== 'string') {
                return new Error('Input must be a string');
            }
            const EMOJI_MAP = $.bsEmojiPicker.map;
            // Flatten categories into a single ordered list (priority by order here)
            const MAP = [
                ...EMOJI_MAP.heartsAndLove,
                ...EMOJI_MAP.classics,
                ...EMOJI_MAP.handsAndGestures,
                ...EMOJI_MAP.symbolsAndObjects,
                ...EMOJI_MAP.animalsAndNature,
                ...EMOJI_MAP.slackDiscordFaces,
            ];
            let out = str;
            for (const {re, emoji} of MAP) {
                out = out.replace(re, emoji);
            }
            return out;
        },
        insertEmotjiAtCursor($input, emoji) {
            const $target = $($input); // jQuery-Objekt aus dem Eingabefeld
            $target.focus(); // Fokus auf das Eingabefeld setzen
            const start = $target.prop('selectionStart') ?? $target.val().length; // Startposition der Auswahl
            const end = $target.prop('selectionEnd') ?? $target.val().length; // Endposition der Auswahl
            const value = $target.val(); // Eingabe-Wert abrufen

            // Wert mit eingefügtem Emoji aktualisieren
            const newValue = value.slice(0, start) + emoji + value.slice(end);
            $target.val(newValue);

            const newCursorPos = start + emoji.length; // Neue Position der Cursor-Position berechnen
            $target.prop('selectionStart', newCursorPos); // Auswahl-Start aktualisieren
            $target.prop('selectionEnd', newCursorPos); // Auswahl-Ende aktualisieren

            // Falls ein `input`-Event erforderlich ist, mit jQuery auslösen
            $target.trigger('input');
        },
        globalEvents($wrapper) {
            if (!$.bsEmojiPicker.globalEvents) {
                $(document)
                    .on('input paste change', '.bs-emoji-picker-listener', function(e){
                        pluginFunctions.emojifyTarget($(e.currentTarget));
                    })
                    .on('click', '.bs-emoji-picker [data-emoji]', function (e) {
                    e.preventDefault();
                    const element = $(e.currentTarget);
                    const wrap = element.closest('.bs-emoji-picker');
                    const settings = pluginFunctions.getSettings(wrap);
                    const emoji = element.data('emoji');
                    if (settings) {
                        if (settings.hasOwnProperty('onClickEmoji') && typeof settings.onClickEmoji === 'function') {
                            settings.onClickEmoji(emoji);
                        }
                        if (settings.hasOwnProperty('targetInput') && $(settings.targetInput).length) {
                            pluginFunctions.insertEmotjiAtCursor($(settings.targetInput), emoji);
                        }
                    }
                })
                $.bsEmojiPicker.globalEvents = true;
            } else {
                console.warn('Global events already enabled');
            }
        }
    };

    const pluginMethods = {
        'emojify'(text) {
            return pluginFunctions.emojify(text);
        },
        'emojifyTarget'($taget) {
            return pluginFunctions.emojifyTarget($taget);
        }
    };
    /**
     *
     * @param {undefined | null | string | object} methodOrOptions
     * @param {undefined | null | any} params
     */
    $.fn.bsEmojiPicker = function (methodOrOptions, ...params) {
        if ($(this).length === 0) {
            return this;
        }
        if ($(this).length > 1) {
            return $(this).each(function (i, e) {
                return $(e).bsEmojiPicker(methodOrOptions, ...params);
            });
        }
        const $wrapper = $(this);
        let settings = pluginFunctions.getSettings($wrapper);
        if (!settings) {
            $wrapper.addClass('bs-emoji-picker');
            const options = typeof methodOrOptions === 'object' ? methodOrOptions : {};
            const settings = $.extend(true, {}, $.bsEmojiPicker.defaults, options);
            pluginFunctions.setSettings($wrapper, settings);
            pluginFunctions.buildDropdown($wrapper);
            const $target = $(settings.targetInput);
            const hasTarget = $target.length > 0;
            if (hasTarget) {
                $($target).addClass('bs-emoji-picker-listener');
            }
            pluginFunctions.globalEvents($wrapper);
            if (hasTarget) {
                $($target).trigger('input');
            }
        }

        if (typeof methodOrOptions === 'string') {
            const method = methodOrOptions;
            if (pluginFunctions.hasOwnProperty(method)) {
                try {
                    const anyReturnValue = pluginFunctions[method](...params);
                    if (anyReturnValue) {
                        return anyReturnValue;
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }

        return $wrapper;
    }
}(jQuery));
