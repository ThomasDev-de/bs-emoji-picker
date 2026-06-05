(function ($) {
    'use strict';

    if (!$) {
        throw new Error('bsEmojiPicker requires jQuery.');
    }

    const DATA_KEY = 'bsEmojiPicker';
    const LISTENER_CLASS = 'bs-emoji-picker-listener';
    const WRAPPER_CLASS = 'bs-emoji-picker';
    const DROPDOWN_CLASS = 'dropdown-emoji';

    $.bsEmojiPicker = {
        version: '2.0.2',

        defaults: {
            btnClass: 'btn btn-outline-secondary',
            btnText: '<i class="bi bi-emoji-smile"></i>',
            btnIconClass: 'bi bi-emoji-smile',
            btnShowToggle: false,
            targetInput: null,
            labels: {
                classics: 'Classics',
                slackDiscordFaces: 'Slack/Discord Faces',
                heartsAndLove: 'Hearts & Love',
                handsAndGestures: 'Hands & Gestures',
                symbolsAndObjects: 'Symbols & Objects',
                animalsAndNature: 'Animals & Nature',
                foodAndDrink: 'Food & Drink',
                activitiesAndSports: 'Activities & Sports',
                travelAndPlaces: 'Travel & Places',
                weatherAndNatureExtras: 'Weather & Nature',
                plantsAndFlowers: 'Plants & Flowers',
                techAndObjectsExtra: 'Tech & Objects',
                uiSymbolsExtra: 'UI Symbols',
                communicationAndMedia: 'Communication & Media',
                peopleAndEmotionsExtra: 'People & Emotions',
                flagsBasic: 'Flags'
            },
            categoryIcons: {
                recent: 'bi-clock-history',
                classics: 'bi-emoji-smile',
                slackDiscordFaces: 'bi-emoji-laughing',
                heartsAndLove: 'bi-heart',
                handsAndGestures: 'bi-hand-thumbs-up',
                symbolsAndObjects: 'bi-hash',
                animalsAndNature: 'bi-bug',
                foodAndDrink: 'bi-cup-straw',
                activitiesAndSports: 'bi-controller',
                travelAndPlaces: 'bi-airplane',
                weatherAndNatureExtras: 'bi-cloud-sun',
                plantsAndFlowers: 'bi-flower1',
                techAndObjectsExtra: 'bi-laptop',
                uiSymbolsExtra: 'bi-circle-square',
                communicationAndMedia: 'bi-chat-dots',
                peopleAndEmotionsExtra: 'bi-people',
                flagsBasic: 'bi-flag'
            },
            onClickEmoji(emoji) {
                return emoji;
            }
        },

        asciiMap: [
            { re: /<\/3/g, emoji: '💔' },
            { re: /<3/g, emoji: '❤️' },
            { re: /:'-D|:'D/gi, emoji: '😂' },
            { re: /:-D|:D|=D|xD|XD/gi, emoji: '😁' },
            { re: /:-\)|:\)|=\)|:\]|\=\]|:\^\)|\(=:|\(-:/g, emoji: '🙂' },
            { re: /:-\(|:\(|=\(|:\[|=\[/g, emoji: '🙁' },
            { re: /D:/g, emoji: '😧' },
            { re: /:-O|:O|:-o|:o/gi, emoji: '😮' },
            { re: /:-\*|:\*/g, emoji: '😘' },
            { re: /\^_\^/g, emoji: '😊' },
            { re: /;-?\)|;-?D/g, emoji: '😉' },
            { re: /:-P|:P|=-P|=-p|:p/gi, emoji: '😛' },
            { re: /:-S|:S/gi, emoji: '😖' },
            { re: /:-\||:\|/g, emoji: '😐' },
            { re: />:-\(|>:\(/g, emoji: '😠' },
            { re: />:-\)|>:\)/g, emoji: '😈' },
            { re: /O:-\)|0:-\)/g, emoji: '😇' },
            { re: /-_-|\.__\./g, emoji: '😴' },
            { re: /:'-\(|:'\(/g, emoji: '😢' },
            { re: /T_T|;_;|QQ/g, emoji: '😭' },
            { re: /:-X|:X/gi, emoji: '🤐' },
            { re: /:-\$|:\$/g, emoji: '😳' },
            { re: /¯\\_\(ツ\)_\/¯/g, emoji: '🤷' },
            { re: /:-\?|\?_o/gi, emoji: '🤔' },
            { re: /B-?\)|b-?\)/g, emoji: '😎' }
        ],

        emojiData: {
            heartsAndLove: [
                { emoji: '❤️', shortcodes: ['heart', 'red_heart'] },
                { emoji: '💖', shortcodes: ['sparkling_heart'] },
                { emoji: '💕', shortcodes: ['two_hearts'] },
                { emoji: '💞', shortcodes: ['revolving_hearts'] },
                { emoji: '💓', shortcodes: ['heartbeat'] },
                { emoji: '💗', shortcodes: ['heartpulse'] },
                { emoji: '💘', shortcodes: ['cupid'] },
                { emoji: '💝', shortcodes: ['gift_heart'] },
                { emoji: '💟', shortcodes: ['heart_decoration'] },
                { emoji: '💙', shortcodes: ['blue_heart'] },
                { emoji: '💚', shortcodes: ['green_heart'] },
                { emoji: '💛', shortcodes: ['yellow_heart'] },
                { emoji: '💜', shortcodes: ['purple_heart'] },
                { emoji: '🖤', shortcodes: ['black_heart'] },
                { emoji: '🤍', shortcodes: ['white_heart'] },
                { emoji: '🧡', shortcodes: ['orange_heart'] },
                { emoji: '🤎', shortcodes: ['brown_heart'] },
                { emoji: '🩷', shortcodes: ['pink_heart'] },
                { emoji: '🩵', shortcodes: ['light_blue_heart'] },
                { emoji: '🩶', shortcodes: ['grey_heart', 'gray_heart'] },
                { emoji: '💔', shortcodes: ['broken_heart'] },
                { emoji: '❣️', shortcodes: ['heart_exclamation'] },
                { emoji: '❤️‍🔥', shortcodes: ['heart_on_fire'] },
                { emoji: '❤️‍🩹', shortcodes: ['mending_heart'] },
                { emoji: '♥️', shortcodes: ['hearts'] },
                { emoji: '♠️', shortcodes: ['spades'] },
                { emoji: '♣️', shortcodes: ['clubs'] },
                { emoji: '♦️', shortcodes: ['diamonds'] },
                { emoji: '💌', shortcodes: ['love_letter'] },
                { emoji: '💍', shortcodes: ['ring'] },
                { emoji: '💎', shortcodes: ['gem'] }
            ],

            classics: [
                { emoji: '😀', shortcodes: ['grinning'] },
                { emoji: '😃', shortcodes: ['smiley'] },
                { emoji: '😄', shortcodes: ['smile'] },
                { emoji: '😁', shortcodes: ['grin'] },
                { emoji: '😆', shortcodes: ['laughing'] },
                { emoji: '😅', shortcodes: ['sweat_smile'] },
                { emoji: '🤣', shortcodes: ['rofl'] },
                { emoji: '😂', shortcodes: ['joy'] },
                { emoji: '🙂', shortcodes: ['slightly_smiling_face'] },
                { emoji: '🙃', shortcodes: ['upside_down_face'] },
                { emoji: '😉', shortcodes: ['wink'] },
                { emoji: '😊', shortcodes: ['blush'] },
                { emoji: '😇', shortcodes: ['innocent'] },
                { emoji: '🥰', shortcodes: ['smiling_face_with_three_hearts'] },
                { emoji: '😍', shortcodes: ['heart_eyes'] },
                { emoji: '🤩', shortcodes: ['star_struck'] },
                { emoji: '😘', shortcodes: ['kissing_heart'] },
                { emoji: '😗', shortcodes: ['kissing'] },
                { emoji: '😚', shortcodes: ['kissing_closed_eyes'] },
                { emoji: '😙', shortcodes: ['kissing_smiling_eyes'] },
                { emoji: '😋', shortcodes: ['yum'] },
                { emoji: '😛', shortcodes: ['stuck_out_tongue'] },
                { emoji: '😜', shortcodes: ['stuck_out_tongue_winking_eye'] },
                { emoji: '🤪', shortcodes: ['zany_face'] },
                { emoji: '😝', shortcodes: ['stuck_out_tongue_closed_eyes'] },
                { emoji: '🤑', shortcodes: ['money_mouth_face'] },
                { emoji: '🤗', shortcodes: ['hugging_face'] },
                { emoji: '🤭', shortcodes: ['face_with_hand_over_mouth'] },
                { emoji: '🤫', shortcodes: ['shushing_face'] },
                { emoji: '🤔', shortcodes: ['thinking'] },
                { emoji: '🤐', shortcodes: ['zipper_mouth_face'] },
                { emoji: '🤨', shortcodes: ['raised_eyebrow'] },
                { emoji: '😐', shortcodes: ['neutral_face'] },
                { emoji: '😑', shortcodes: ['expressionless'] },
                { emoji: '😶', shortcodes: ['no_mouth'] },
                { emoji: '😏', shortcodes: ['smirk'] },
                { emoji: '😒', shortcodes: ['unamused'] },
                { emoji: '🙄', shortcodes: ['rolling_eyes'] },
                { emoji: '😬', shortcodes: ['grimacing'] },
                { emoji: '🤥', shortcodes: ['lying_face'] },
                { emoji: '😌', shortcodes: ['relieved'] },
                { emoji: '😔', shortcodes: ['pensive'] },
                { emoji: '😪', shortcodes: ['sleepy'] },
                { emoji: '🤤', shortcodes: ['drooling_face'] },
                { emoji: '😴', shortcodes: ['sleeping'] },
                { emoji: '😷', shortcodes: ['mask'] },
                { emoji: '🤒', shortcodes: ['face_with_thermometer'] },
                { emoji: '🤕', shortcodes: ['face_with_head_bandage'] },
                { emoji: '🤢', shortcodes: ['nauseated_face'] },
                { emoji: '🤮', shortcodes: ['vomiting_face'] },
                { emoji: '🤧', shortcodes: ['sneezing_face'] },
                { emoji: '🥵', shortcodes: ['hot_face'] },
                { emoji: '🥶', shortcodes: ['cold_face'] },
                { emoji: '🥴', shortcodes: ['woozy_face'] },
                { emoji: '😵', shortcodes: ['dizzy_face'] },
                { emoji: '🤯', shortcodes: ['exploding_head'] },
                { emoji: '🤠', shortcodes: ['cowboy_hat_face'] },
                { emoji: '🥳', shortcodes: ['partying_face'] },
                { emoji: '😎', shortcodes: ['sunglasses'] },
                { emoji: '🤓', shortcodes: ['nerd_face'] },
                { emoji: '🧐', shortcodes: ['monocle_face'] },
                { emoji: '😕', shortcodes: ['confused'] },
                { emoji: '😟', shortcodes: ['worried'] },
                { emoji: '🙁', shortcodes: ['slightly_frowning_face'] },
                { emoji: '☹️', shortcodes: ['frowning'] },
                { emoji: '😮', shortcodes: ['open_mouth'] },
                { emoji: '😯', shortcodes: ['hushed'] },
                { emoji: '😲', shortcodes: ['astonished'] },
                { emoji: '😳', shortcodes: ['flushed'] },
                { emoji: '🥺', shortcodes: ['pleading_face'] },
                { emoji: '😢', shortcodes: ['cry'] },
                { emoji: '😭', shortcodes: ['sob'] },
                { emoji: '😤', shortcodes: ['triumph'] },
                { emoji: '😡', shortcodes: ['rage'] },
                { emoji: '😠', shortcodes: ['angry'] },
                { emoji: '🤬', shortcodes: ['face_with_symbols_on_mouth'] },
                { emoji: '😈', shortcodes: ['smiling_imp'] },
                { emoji: '👿', shortcodes: ['imp'] },
                { emoji: '💀', shortcodes: ['skull'] },
                { emoji: '☠️', shortcodes: ['skull_and_crossbones'] },
                { emoji: '💩', shortcodes: ['poop'] },
                { emoji: '🤡', shortcodes: ['clown_face'] },
                { emoji: '👹', shortcodes: ['ogre'] },
                { emoji: '👺', shortcodes: ['goblin'] },
                { emoji: '👻', shortcodes: ['ghost'] },
                { emoji: '👽', shortcodes: ['alien'] },
                { emoji: '👾', shortcodes: ['space_invader'] },
                { emoji: '🤖', shortcodes: ['robot'] },
                { emoji: '🤷', shortcodes: ['shrug'] },
                { emoji: '🤦', shortcodes: ['facepalm'] }
            ],

            slackDiscordFaces: [
                { emoji: '😄', shortcodes: ['smile'] },
                { emoji: '😃', shortcodes: ['smiley'] },
                { emoji: '😀', shortcodes: ['grinning'] },
                { emoji: '😁', shortcodes: ['grin', 'beaming_face_with_smiling_eyes'] },
                { emoji: '😂', shortcodes: ['joy'] },
                { emoji: '🤣', shortcodes: ['rofl'] },
                { emoji: '😉', shortcodes: ['wink'] },
                { emoji: '😊', shortcodes: ['blush'] },
                { emoji: '😇', shortcodes: ['innocent'] },
                { emoji: '🥰', shortcodes: ['smiling_face_with_3_hearts'] },
                { emoji: '😍', shortcodes: ['heart_eyes'] },
                { emoji: '🤩', shortcodes: ['star_struck'] },
                { emoji: '😘', shortcodes: ['kissing_heart'] },
                { emoji: '😗', shortcodes: ['kissing'] },
                { emoji: '😚', shortcodes: ['kissing_closed_eyes'] },
                { emoji: '😙', shortcodes: ['kissing_smiling_eyes'] },
                { emoji: '😋', shortcodes: ['yum'] },
                { emoji: '😛', shortcodes: ['stuck_out_tongue'] },
                { emoji: '😜', shortcodes: ['stuck_out_tongue_winking_eye'] },
                { emoji: '🤪', shortcodes: ['zany_face'] },
                { emoji: '😝', shortcodes: ['stuck_out_tongue_closed_eyes'] },
                { emoji: '🤑', shortcodes: ['money_mouth_face'] },
                { emoji: '🤗', shortcodes: ['hugging_face'] },
                { emoji: '🤭', shortcodes: ['face_with_hand_over_mouth'] },
                { emoji: '🫢', shortcodes: ['face_with_open_eyes_and_hand_over_mouth'] },
                { emoji: '🫣', shortcodes: ['face_with_peeking_eye'] },
                { emoji: '🤫', shortcodes: ['shushing_face'] },
                { emoji: '🤔', shortcodes: ['thinking_face'] },
                { emoji: '🫡', shortcodes: ['saluting_face'] },
                { emoji: '🤐', shortcodes: ['zipper_mouth_face'] },
                { emoji: '🤨', shortcodes: ['raised_eyebrow'] },
                { emoji: '😐', shortcodes: ['neutral_face'] },
                { emoji: '😑', shortcodes: ['expressionless'] },
                { emoji: '😶', shortcodes: ['no_mouth'] },
                { emoji: '🫥', shortcodes: ['dotted_line_face'] },
                { emoji: '😶‍🌫️', shortcodes: ['face_in_clouds'] },
                { emoji: '😏', shortcodes: ['smirk'] },
                { emoji: '😒', shortcodes: ['unamused'] },
                { emoji: '🙄', shortcodes: ['rolling_eyes'] },
                { emoji: '😬', shortcodes: ['grimacing'] },
                { emoji: '😮‍💨', shortcodes: ['face_exhaling'] },
                { emoji: '🤥', shortcodes: ['lying_face'] },
                { emoji: '😌', shortcodes: ['relieved'] },
                { emoji: '😔', shortcodes: ['pensive'] },
                { emoji: '😪', shortcodes: ['sleepy'] },
                { emoji: '🤤', shortcodes: ['drooling_face'] },
                { emoji: '😴', shortcodes: ['sleeping'] },
                { emoji: '😷', shortcodes: ['mask'] },
                { emoji: '🤒', shortcodes: ['face_with_thermometer'] },
                { emoji: '🤕', shortcodes: ['face_with_head_bandage'] },
                { emoji: '🤢', shortcodes: ['nauseated_face'] },
                { emoji: '🤮', shortcodes: ['vomiting_face'] },
                { emoji: '🤧', shortcodes: ['sneezing_face'] },
                { emoji: '🥵', shortcodes: ['hot_face'] },
                { emoji: '🥶', shortcodes: ['cold_face'] },
                { emoji: '🥴', shortcodes: ['woozy_face'] },
                { emoji: '😵', shortcodes: ['dizzy_face'] },
                { emoji: '😵‍💫', shortcodes: ['face_with_spiral_eyes'] },
                { emoji: '🤯', shortcodes: ['exploding_head'] },
                { emoji: '🤠', shortcodes: ['cowboy_hat_face'] },
                { emoji: '🥳', shortcodes: ['partying_face'] },
                { emoji: '🥸', shortcodes: ['disguised_face'] },
                { emoji: '😎', shortcodes: ['sunglasses'] },
                { emoji: '🤓', shortcodes: ['nerd_face'] },
                { emoji: '🧐', shortcodes: ['monocle_face'] },
                { emoji: '😕', shortcodes: ['confused'] },
                { emoji: '😟', shortcodes: ['worried'] },
                { emoji: '🙁', shortcodes: ['slightly_frowning_face'] },
                { emoji: '☹️', shortcodes: ['frowning'] },
                { emoji: '😮', shortcodes: ['open_mouth'] },
                { emoji: '😯', shortcodes: ['hushed'] },
                { emoji: '😲', shortcodes: ['astonished'] },
                { emoji: '😳', shortcodes: ['flushed'] },
                { emoji: '🥺', shortcodes: ['pleading_face'] },
                { emoji: '🥹', shortcodes: ['face_holding_back_tears'] },
                { emoji: '😦', shortcodes: ['frowning_with_open_mouth'] },
                { emoji: '😧', shortcodes: ['anguished'] },
                { emoji: '😨', shortcodes: ['fearful'] },
                { emoji: '😰', shortcodes: ['cold_sweat'] },
                { emoji: '😥', shortcodes: ['disappointed_relieved'] },
                { emoji: '😢', shortcodes: ['cry'] },
                { emoji: '😭', shortcodes: ['sob'] },
                { emoji: '😱', shortcodes: ['scream'] },
                { emoji: '😖', shortcodes: ['confounded'] },
                { emoji: '😣', shortcodes: ['persevere'] },
                { emoji: '😞', shortcodes: ['disappointed'] },
                { emoji: '😓', shortcodes: ['sweat'] },
                { emoji: '😩', shortcodes: ['weary'] },
                { emoji: '😫', shortcodes: ['tired_face'] },
                { emoji: '🥱', shortcodes: ['yawning_face'] },
                { emoji: '😤', shortcodes: ['triumph'] },
                { emoji: '😡', shortcodes: ['rage'] },
                { emoji: '😠', shortcodes: ['angry'] },
                { emoji: '🤬', shortcodes: ['face_with_symbols_on_mouth'] },
                { emoji: '😈', shortcodes: ['smiling_imp'] },
                { emoji: '👿', shortcodes: ['imp'] },
                { emoji: '💀', shortcodes: ['skull'] },
                { emoji: '☠️', shortcodes: ['skull_and_crossbones'] },
                { emoji: '💩', shortcodes: ['poop'] },
                { emoji: '🤡', shortcodes: ['clown_face'] },
                { emoji: '👹', shortcodes: ['ogre'] },
                { emoji: '👺', shortcodes: ['goblin'] },
                { emoji: '👻', shortcodes: ['ghost'] },
                { emoji: '👽', shortcodes: ['alien'] },
                { emoji: '👾', shortcodes: ['space_invader'] },
                { emoji: '🤖', shortcodes: ['robot'] }
            ],

            handsAndGestures: [
                { emoji: '👍', shortcodes: ['thumbsup', '+1'] },
                { emoji: '👎', shortcodes: ['thumbsdown', '-1'] },
                { emoji: '👏', shortcodes: ['clap'] },
                { emoji: '🙌', shortcodes: ['raised_hands'] },
                { emoji: '👐', shortcodes: ['open_hands'] },
                { emoji: '🤲', shortcodes: ['palms_up_together'] },
                { emoji: '🙏', shortcodes: ['pray', 'folded_hands'] },
                { emoji: '🤝', shortcodes: ['handshake'] },
                { emoji: '🤝', shortcodes: ['handshake'] },
                { emoji: '👋', shortcodes: ['wave', 'waving_hand'] },
                { emoji: '🤚', shortcodes: ['raised_back_of_hand'] },
                { emoji: '✋', shortcodes: ['raised_hand', 'hand'] },
                { emoji: '🖐️', shortcodes: ['raised_hand_with_fingers_splayed'] },
                { emoji: '🖖', shortcodes: ['vulcan_salute'] },
                { emoji: '👌', shortcodes: ['ok_hand', 'ok'] },
                { emoji: '🤌', shortcodes: ['pinched_fingers'] },
                { emoji: '🤏', shortcodes: ['pinching_hand'] },
                { emoji: '✌️', shortcodes: ['v', 'victory_hand'] },
                { emoji: '🤞', shortcodes: ['fingers_crossed', 'crossed_fingers'] },
                { emoji: '🤟', shortcodes: ['love_you_gesture'] },
                { emoji: '🤘', shortcodes: ['metal', 'sign_of_the_horns'] },
                { emoji: '🤙', shortcodes: ['call_me', 'call_me_hand'] },
                { emoji: '👈', shortcodes: ['point_left', 'backhand_index_pointing_left'] },
                { emoji: '👉', shortcodes: ['point_right', 'backhand_index_pointing_right'] },
                { emoji: '👆', shortcodes: ['point_up', 'backhand_index_pointing_up'] },
                { emoji: '👇', shortcodes: ['point_down', 'backhand_index_pointing_down'] },
                { emoji: '☝️', shortcodes: ['point_up_2'] },
                { emoji: '🖕', shortcodes: ['middle_finger'] },
                { emoji: '✊', shortcodes: ['fist', 'raised_fist'] },
                { emoji: '👊', shortcodes: ['oncoming_fist', 'punch'] },
                { emoji: '🤛', shortcodes: ['left_facing_fist'] },
                { emoji: '🤜', shortcodes: ['right_facing_fist'] },
                { emoji: '🫰', shortcodes: ['hand_with_index_finger_and_thumb_crossed'] },
                { emoji: '🫵', shortcodes: ['index_pointing_at_the_viewer'] },
                { emoji: '🫱', shortcodes: ['rightwards_hand'] },
                { emoji: '🫲', shortcodes: ['leftwards_hand'] },
                { emoji: '🫳', shortcodes: ['palm_down_hand'] },
                { emoji: '🫴', shortcodes: ['palm_up_hand'] },
                { emoji: '💪', shortcodes: ['muscle'] },
                { emoji: '🦾', shortcodes: ['mechanical_arm'] },
                { emoji: '🦵', shortcodes: ['leg'] },
                { emoji: '🦿', shortcodes: ['mechanical_leg'] },
                { emoji: '🦶', shortcodes: ['foot'] },
                { emoji: '👂', shortcodes: ['ear'] },
                { emoji: '🦻', shortcodes: ['hearing_aid'] },
                { emoji: '👃', shortcodes: ['nose'] },
                { emoji: '🧠', shortcodes: ['brain'] },
                { emoji: '🫀', shortcodes: ['heart_organ'] },
                { emoji: '🫁', shortcodes: ['lungs'] },
                { emoji: '🦷', shortcodes: ['tooth'] },
                { emoji: '🦴', shortcodes: ['bone'] },
                { emoji: '👀', shortcodes: ['eyes'] },
                { emoji: '👁️', shortcodes: ['eye'] },
                { emoji: '👅', shortcodes: ['tongue'] },
                { emoji: '👄', shortcodes: ['mouth'] },
                { emoji: '🫦', shortcodes: ['biting_lip'] },
                { emoji: '🩸', shortcodes: ['drop_of_blood'] },
                { emoji: '💅', shortcodes: ['nail_care'] },
                { emoji: '🤳', shortcodes: ['selfie'] }
            ],

            peopleAndEmotionsExtra: [
                { emoji: '🥰', shortcodes: ['smiling_face_with_3_hearts'] },
                { emoji: '😘', shortcodes: ['face_blowing_a_kiss'] },
                { emoji: '🤗', shortcodes: ['hugging_face'] },
                { emoji: '🤭', shortcodes: ['face_with_hand_over_mouth'] },
                { emoji: '🫢', shortcodes: ['face_with_open_eyes_and_hand_over_mouth'] },
                { emoji: '🫣', shortcodes: ['face_with_peeking_eye'] },
                { emoji: '🤫', shortcodes: ['shushing_face'] },
                { emoji: '🤥', shortcodes: ['lying_face'] },
                { emoji: '😌', shortcodes: ['relieved'] },
                { emoji: '😔', shortcodes: ['pensive'] },
                { emoji: '😪', shortcodes: ['sleepy'] },
                { emoji: '🥱', shortcodes: ['yawning_face'] },
                { emoji: '😷', shortcodes: ['mask'] },
                { emoji: '🤒', shortcodes: ['face_with_thermometer'] },
                { emoji: '🤕', shortcodes: ['face_with_head_bandage'] },
                { emoji: '🤢', shortcodes: ['nauseated_face'] },
                { emoji: '🤮', shortcodes: ['vomiting_face'] },
                { emoji: '🤧', shortcodes: ['sneezing_face'] },
                { emoji: '🥵', shortcodes: ['hot_face'] },
                { emoji: '🥶', shortcodes: ['cold_face'] },
                { emoji: '🤠', shortcodes: ['cowboy_hat_face'] },
                { emoji: '🥸', shortcodes: ['disguised_face'] },
                { emoji: '🤓', shortcodes: ['nerd_face'] },
                { emoji: '🧐', shortcodes: ['monocle_face'] },
                { emoji: '🤖', shortcodes: ['robot'] },
                { emoji: '👻', shortcodes: ['ghost'] },
                { emoji: '💀', shortcodes: ['skull'] },
                { emoji: '☠️', shortcodes: ['skull_and_crossbones'] },
                { emoji: '👽', shortcodes: ['alien'] },
                { emoji: '👾', shortcodes: ['space_invader'] },
                { emoji: '💩', shortcodes: ['poop', 'shit', 'pile_of_poo'] },
                { emoji: '🤡', shortcodes: ['clown_face'] },
                { emoji: '👹', shortcodes: ['ogre'] },
                { emoji: '👺', shortcodes: ['goblin'] },
                { emoji: '🙈', shortcodes: ['see_no_evil'] },
                { emoji: '🙉', shortcodes: ['hear_no_evil'] },
                { emoji: '🙊', shortcodes: ['speak_no_evil'] },
                { emoji: '🥷', shortcodes: ['ninja'] },
                { emoji: '🕵️', shortcodes: ['detective'] },
                { emoji: '🧙', shortcodes: ['mage'] },
                { emoji: '🧚', shortcodes: ['fairy'] },
                { emoji: '🧛', shortcodes: ['vampire'] },
                { emoji: '🧟', shortcodes: ['zombie'] },
                { emoji: '🧜', shortcodes: ['merperson'] },
                { emoji: '🧝', shortcodes: ['elf'] },
                { emoji: '🧞', shortcodes: ['genie'] },
                { emoji: '🧌', shortcodes: ['troll'] },
                { emoji: '🦸', shortcodes: ['superhero'] },
                { emoji: '🦹', shortcodes: ['supervillain'] },
                { emoji: '🧑‍🚀', shortcodes: ['astronaut'] },
                { emoji: '🧑‍🚒', shortcodes: ['firefighter'] },
                { emoji: '🧑‍🔬', shortcodes: ['scientist'] },
                { emoji: '🧑‍🎨', shortcodes: ['artist'] },
                { emoji: '🧑‍🍳', shortcodes: ['cook'] },
                { emoji: '🧑‍🏫', shortcodes: ['teacher'] },
                { emoji: '🧑‍🏭', shortcodes: ['factory_worker'] },
                { emoji: '🧑‍💻', shortcodes: ['technologist'] },
                { emoji: '🧑‍💼', shortcodes: ['office_worker'] },
                { emoji: '🧑‍🔧', shortcodes: ['mechanic'] },
                { emoji: '🧑‍⚕️', shortcodes: ['health_worker'] },
                { emoji: '🧑‍⚖️', shortcodes: ['judge'] },
                { emoji: '🧑‍✈️', shortcodes: ['pilot'] },
                { emoji: '👮', shortcodes: ['police_officer'] },
                { emoji: '👷', shortcodes: ['construction_worker'] },
                { emoji: '💂', shortcodes: ['guard'] },
                { emoji: '🤵', shortcodes: ['person_in_tuxedo'] },
                { emoji: '👰', shortcodes: ['person_with_veil'] },
                { emoji: '🤴', shortcodes: ['prince'] },
                { emoji: '👸', shortcodes: ['princess'] },
                { emoji: '👶', shortcodes: ['baby'] },
                { emoji: '👧', shortcodes: ['girl'] },
                { emoji: '🧒', shortcodes: ['child'] },
                { emoji: '👦', shortcodes: ['boy'] },
                { emoji: '👩', shortcodes: ['woman'] },
                { emoji: '🧑', shortcodes: ['person'] },
                { emoji: '👨', shortcodes: ['man'] },
                { emoji: '👵', shortcodes: ['old_woman'] },
                { emoji: '🧓', shortcodes: ['older_person'] },
                { emoji: '👴', shortcodes: ['old_man'] },
                { emoji: '🤰', shortcodes: ['pregnant_woman'] },
                { emoji: '🫄', shortcodes: ['pregnant_person'] },
                { emoji: '🫃', shortcodes: ['pregnant_man'] },
                { emoji: '🤱', shortcodes: ['breast_feeding'] },
                { emoji: '👩‍🍼', shortcodes: ['woman_feeding_baby'] },
                { emoji: '👨‍🍼', shortcodes: ['man_feeding_baby'] },
                { emoji: '🧑‍🍼', shortcodes: ['person_feeding_baby'] },
                { emoji: '👩‍🦱', shortcodes: ['woman_curly_hair'] },
                { emoji: '🧑‍🦱', shortcodes: ['person_curly_hair'] },
                { emoji: '👨‍🦱', shortcodes: ['man_curly_hair'] },
                { emoji: '👩‍🦰', shortcodes: ['woman_red_hair'] },
                { emoji: '🧑‍🦰', shortcodes: ['person_red_hair'] },
                { emoji: '👨‍🦰', shortcodes: ['man_red_hair'] },
                { emoji: '👱‍♀️', shortcodes: ['blonde_woman'] },
                { emoji: '👱', shortcodes: ['blonde_person'] },
                { emoji: '👱‍♂️', shortcodes: ['blonde_man'] },
                { emoji: '👩‍🦳', shortcodes: ['woman_white_hair'] },
                { emoji: '🧑‍🦳', shortcodes: ['person_white_hair'] },
                { emoji: '👨‍🦳', shortcodes: ['man_white_hair'] },
                { emoji: '👩‍🦲', shortcodes: ['woman_bald'] },
                { emoji: '🧑‍🦲', shortcodes: ['person_bald'] },
                { emoji: '👨‍🦲', shortcodes: ['man_bald'] },
                { emoji: '🧔‍♀️', shortcodes: ['bearded_woman'] },
                { emoji: '🧔', shortcodes: ['bearded_person'] },
                { emoji: '🧔‍♂️', shortcodes: ['bearded_man'] },
                { emoji: '👣', shortcodes: ['footprints'] }
            ],

            symbolsAndObjects: [
                { emoji: '⭐', shortcodes: ['star'] },
                { emoji: '🌟', shortcodes: ['star2'] },
                { emoji: '✨', shortcodes: ['sparkles'] },
                { emoji: '💫', shortcodes: ['dizzy'] },
                { emoji: '🔥', shortcodes: ['fire'] },
                { emoji: '💥', shortcodes: ['boom', 'collision'] },
                { emoji: '💢', shortcodes: ['anger'] },
                { emoji: '💦', shortcodes: ['sweat_drops'] },
                { emoji: '💨', shortcodes: ['dash'] },
                { emoji: '🕳️', shortcodes: ['hole'] },
                { emoji: '🎉', shortcodes: ['tada'] },
                { emoji: '🎊', shortcodes: ['confetti_ball'] },
                { emoji: '🚀', shortcodes: ['rocket'] },
                { emoji: '🛸', shortcodes: ['flying_saucer'] },
                { emoji: '👀', shortcodes: ['eyes'] },
                { emoji: '👁️', shortcodes: ['eye'] },
                { emoji: '💯', shortcodes: ['100'] },
                { emoji: '✅', shortcodes: ['check', 'white_check_mark'] },
                { emoji: '✔️', shortcodes: ['heavy_check_mark'] },
                { emoji: '❌', shortcodes: ['x', 'cross_mark'] },
                { emoji: '💡', shortcodes: ['bulb', 'idea'] },
                { emoji: '⚠️', shortcodes: ['warning'] },
                { emoji: '❓', shortcodes: ['question'] },
                { emoji: '❔', shortcodes: ['grey_question', 'gray_question'] },
                { emoji: '❗', shortcodes: ['exclamation'] },
                { emoji: '❕', shortcodes: ['grey_exclamation', 'gray_exclamation'] },
                { emoji: '‼️', shortcodes: ['bangbang'] },
                { emoji: '⁉️', shortcodes: ['interrobang'] },
                { emoji: '🎁', shortcodes: ['gift'] },
                { emoji: '🔗', shortcodes: ['link'] },
                { emoji: '📎', shortcodes: ['paperclip'] },
                { emoji: '📅', shortcodes: ['calendar'] },
                { emoji: '📆', shortcodes: ['date'] },
                { emoji: '⏰', shortcodes: ['alarm_clock'] },
                { emoji: '☎️', shortcodes: ['phone', 'telephone'] },
                { emoji: '📞', shortcodes: ['telephone_receiver'] },
                { emoji: '📱', shortcodes: ['mobile', 'smartphone', 'mobile_phone'] },
                { emoji: '💻', shortcodes: ['laptop'] },
                { emoji: '🖥️', shortcodes: ['desktop', 'computer'] },
                { emoji: '🖨️', shortcodes: ['printer'] },
                { emoji: '⌨️', shortcodes: ['keyboard'] },
                { emoji: '🔋', shortcodes: ['battery'] },
                { emoji: '🪫', shortcodes: ['low_battery'] },
                { emoji: '🔌', shortcodes: ['plug'] },
                { emoji: '✉️', shortcodes: ['email', 'envelope'] },
                { emoji: '📨', shortcodes: ['incoming_envelope'] },
                { emoji: '📦', shortcodes: ['package'] },
                { emoji: '🛒', shortcodes: ['shopping_cart'] },
                { emoji: '🛍️', shortcodes: ['shopping_bags'] },
                { emoji: '💰', shortcodes: ['moneybag'] },
                { emoji: '🪙', shortcodes: ['coin'] },
                { emoji: '💳', shortcodes: ['credit_card'] },
                { emoji: '🧾', shortcodes: ['receipt'] },
                { emoji: '📈', shortcodes: ['chart_increasing'] },
                { emoji: '📉', shortcodes: ['chart_decreasing'] },
                { emoji: '📊', shortcodes: ['bar_chart'] },
                { emoji: '🔒', shortcodes: ['lock'] },
                { emoji: '🔓', shortcodes: ['unlock'] },
                { emoji: '🔑', shortcodes: ['key'] },
                { emoji: '🗝️', shortcodes: ['old_key'] },
                { emoji: '🔨', shortcodes: ['hammer'] },
                { emoji: '🪓', shortcodes: ['axe'] },
                { emoji: '⛏️', shortcodes: ['pick'] },
                { emoji: '🔧', shortcodes: ['wrench'] },
                { emoji: '🔩', shortcodes: ['nut_and_bolt'] },
                { emoji: '⚙️', shortcodes: ['gear'] },
                { emoji: '🧰', shortcodes: ['toolbox'] },
                { emoji: '🧲', shortcodes: ['magnet'] },
                { emoji: '📷', shortcodes: ['camera'] },
                { emoji: '📸', shortcodes: ['camera_flash'] },
                { emoji: '📹', shortcodes: ['video_camera'] },
                { emoji: '🎥', shortcodes: ['movie_camera'] },
                { emoji: '🎧', shortcodes: ['headphones'] },
                { emoji: '🎤', shortcodes: ['microphone', 'mic'] },
                { emoji: '🎙️', shortcodes: ['studio_microphone'] },
                { emoji: '🔈', shortcodes: ['speaker'] },
                { emoji: '🔊', shortcodes: ['loud_sound'] },
                { emoji: '🔇', shortcodes: ['mute'] },
                { emoji: '🔔', shortcodes: ['bell'] },
                { emoji: '🔕', shortcodes: ['bell_with_slash'] },
                { emoji: '📖', shortcodes: ['book'] },
                { emoji: '📚', shortcodes: ['books'] },
                { emoji: '📓', shortcodes: ['notebook'] },
                { emoji: '📔', shortcodes: ['notebook_with_decorative_cover'] },
                { emoji: '📒', shortcodes: ['ledger'] },
                { emoji: '📋', shortcodes: ['clipboard'] },
                { emoji: '✏️', shortcodes: ['pencil'] },
                { emoji: '🖊️', shortcodes: ['pen'] },
                { emoji: '🖋️', shortcodes: ['fountain_pen'] },
                { emoji: '🖌️', shortcodes: ['paintbrush'] },
                { emoji: '🖍️', shortcodes: ['crayon'] },
                { emoji: '✂️', shortcodes: ['scissors'] },
                { emoji: '🗑️', shortcodes: ['trash', 'wastebasket'] },
                { emoji: '📁', shortcodes: ['folder'] },
                { emoji: '📂', shortcodes: ['open_file_folder'] },
                { emoji: '📄', shortcodes: ['file', 'page_facing_up'] },
                { emoji: '📰', shortcodes: ['newspaper'] },
                { emoji: '📜', shortcodes: ['scroll'] },
                { emoji: '🌐', shortcodes: ['globe', 'globe_with_meridians'] },
                { emoji: '🗺️', shortcodes: ['map'] },
                { emoji: '🧭', shortcodes: ['compass'] },
                { emoji: '📍', shortcodes: ['pin', 'round_pushpin'] },
                { emoji: '📌', shortcodes: ['pushpin'] },
                { emoji: '🔒', shortcodes: ['lock'] },
                { emoji: '🔓', shortcodes: ['unlock'] },
                { emoji: '🔏', shortcodes: ['lock_with_ink_pen'] },
                { emoji: '🔐', shortcodes: ['closed_lock_with_key'] },
                { emoji: '🔑', shortcodes: ['key'] },
                { emoji: '🗝️', shortcodes: ['old_key'] },
                { emoji: '🛠️', shortcodes: ['hammer_and_wrench'] },
                { emoji: '⚒️', shortcodes: ['hammer_and_pick'] },
                { emoji: '⛏️', shortcodes: ['pick'] },
                { emoji: '🔩', shortcodes: ['nut_and_bolt'] },
                { emoji: '⚙️', shortcodes: ['gear'] },
                { emoji: '⚖️', shortcodes: ['balance_scale'] },
                { emoji: '🦯', shortcodes: ['white_cane'] },
                { emoji: '🔗', shortcodes: ['link'] },
                { emoji: '⛓️', shortcodes: ['chains'] },
                { emoji: '🪝', shortcodes: ['hook'] },
                { emoji: '🧰', shortcodes: ['toolbox'] },
                { emoji: '🧲', shortcodes: ['magnet'] },
                { emoji: '🪜', shortcodes: ['ladder'] },
                { emoji: '🧪', shortcodes: ['test_tube'] },
                { emoji: '🧫', shortcodes: ['petri_dish'] },
                { emoji: '🧬', shortcodes: ['dna'] },
                { emoji: '🔬', shortcodes: ['microscope'] },
                { emoji: '🔭', shortcodes: ['telescope'] },
                { emoji: '📡', shortcodes: ['satellite'] },
                { emoji: '💉', shortcodes: ['syringe'] },
                { emoji: '🩸', shortcodes: ['drop_of_blood'] },
                { emoji: '💊', shortcodes: ['pill'] },
                { emoji: '🩹', shortcodes: ['adhesive_bandage'] },
                { emoji: '🩺', shortcodes: ['stethoscope'] }
            ],

            animalsAndNature: [
                { emoji: '🐱', shortcodes: ['cat'] },
                { emoji: '🐶', shortcodes: ['dog'] },
                { emoji: '🐭', shortcodes: ['mouse'] },
                { emoji: '🐹', shortcodes: ['hamster'] },
                { emoji: '🐰', shortcodes: ['rabbit'] },
                { emoji: '🦊', shortcodes: ['fox'] },
                { emoji: '🐻', shortcodes: ['bear'] },
                { emoji: '🐻‍❄️', shortcodes: ['polar_bear'] },
                { emoji: '🐨', shortcodes: ['koala'] },
                { emoji: '🐼', shortcodes: ['panda'] },
                { emoji: '🦥', shortcodes: ['sloth'] },
                { emoji: '🦦', shortcodes: ['otter'] },
                { emoji: '🐯', shortcodes: ['tiger'] },
                { emoji: '🦁', shortcodes: ['lion'] },
                { emoji: '🐮', shortcodes: ['cow'] },
                { emoji: '🐷', shortcodes: ['pig'] },
                { emoji: '🐗', shortcodes: ['boar'] },
                { emoji: '🐒', shortcodes: ['monkey'] },
                { emoji: '🦍', shortcodes: ['gorilla'] },
                { emoji: '🦧', shortcodes: ['orangutan'] },
                { emoji: '🐔', shortcodes: ['chicken'] },
                { emoji: '🐦', shortcodes: ['bird'] },
                { emoji: '🐤', shortcodes: ['baby_chick'] },
                { emoji: '🐧', shortcodes: ['penguin'] },
                { emoji: '🦆', shortcodes: ['duck'] },
                { emoji: '🦅', shortcodes: ['eagle'] },
                { emoji: '🦉', shortcodes: ['owl'] },
                { emoji: '🦩', shortcodes: ['flamingo'] },
                { emoji: '🦚', shortcodes: ['peacock'] },
                { emoji: '🦜', shortcodes: ['parrot'] },
                { emoji: '🦢', shortcodes: ['swan'] },
                { emoji: '🦤', shortcodes: ['dodo'] },
                { emoji: '🐸', shortcodes: ['frog'] },
                { emoji: '🐊', shortcodes: ['crocodile'] },
                { emoji: '🐢', shortcodes: ['turtle'] },
                { emoji: '🦎', shortcodes: ['lizard'] },
                { emoji: '🐍', shortcodes: ['snake'] },
                { emoji: '🐉', shortcodes: ['dragon'] },
                { emoji: '🦕', shortcodes: ['sauropod'] },
                { emoji: '🦖', shortcodes: ['t_rex'] },
                { emoji: '🐋', shortcodes: ['whale'] },
                { emoji: '🐬', shortcodes: ['dolphin'] },
                { emoji: '🦭', shortcodes: ['seal'] },
                { emoji: '🐟', shortcodes: ['fish'] },
                { emoji: '🐠', shortcodes: ['tropical_fish'] },
                { emoji: '🐡', shortcodes: ['blowfish'] },
                { emoji: '🦈', shortcodes: ['shark'] },
                { emoji: '🐙', shortcodes: ['octopus'] },
                { emoji: '🦑', shortcodes: ['squid'] },
                { emoji: '🦀', shortcodes: ['crab'] },
                { emoji: '🦞', shortcodes: ['lobster'] },
                { emoji: '🦐', shortcodes: ['shrimp'] },
                { emoji: '🐚', shortcodes: ['shell'] },
                { emoji: '🐌', shortcodes: ['snail'] },
                { emoji: '🦋', shortcodes: ['butterfly'] },
                { emoji: '🐝', shortcodes: ['bee', 'honeybee'] },
                { emoji: '🐛', shortcodes: ['bug'] },
                { emoji: '🪲', shortcodes: ['beetle'] },
                { emoji: '🐞', shortcodes: ['lady_beetle'] },
                { emoji: '🐜', shortcodes: ['ant'] },
                { emoji: '🦟', shortcodes: ['mosquito'] },
                { emoji: '🪰', shortcodes: ['fly'] },
                { emoji: '🪱', shortcodes: ['worm'] },
                { emoji: '🕷️', shortcodes: ['spider'] },
                { emoji: '🦂', shortcodes: ['scorpion'] },
                { emoji: '🐾', shortcodes: ['paw_print'] },
                { emoji: '🦒', shortcodes: ['giraffe'] },
                { emoji: '🦓', shortcodes: ['zebra'] },
                { emoji: '🦌', shortcodes: ['deer'] },
                { emoji: '🦬', shortcodes: ['bison'] },
                { emoji: '🦏', shortcodes: ['rhinoceros'] },
                { emoji: '🦛', shortcodes: ['hippopotamus'] },
                { emoji: '🐘', shortcodes: ['elephant'] },
                { emoji: '🐪', shortcodes: ['camel'] },
                { emoji: '🐫', shortcodes: ['two_horned_camel'] },
                { emoji: '🦙', shortcodes: ['llama'] },
                { emoji: '🦮', shortcodes: ['guide_dog'] },
                { emoji: '🐕‍🦺', shortcodes: ['service_dog'] },
                { emoji: '🐈‍⬛', shortcodes: ['black_cat'] },
                { emoji: '🦄', shortcodes: ['unicorn'] },
                { emoji: '🐎', shortcodes: ['horse'] },
                { emoji: '🐆', shortcodes: ['leopard'] },
                { emoji: '🐅', shortcodes: ['tiger2'] },
                { emoji: '🐃', shortcodes: ['water_buffalo'] },
                { emoji: '🐂', shortcodes: ['ox'] },
                { emoji: '🐄', shortcodes: ['cow2'] },
                { emoji: '🐐', shortcodes: ['goat'] },
                { emoji: '🐏', shortcodes: ['ram'] },
                { emoji: '🐑', shortcodes: ['sheep'] },
                { emoji: '🐕', shortcodes: ['dog2'] },
                { emoji: '🐩', shortcodes: ['poodle'] },
                { emoji: '🐈', shortcodes: ['cat2'] },
                { emoji: '🐓', shortcodes: ['rooster'] },
                { emoji: '🦃', shortcodes: ['turkey'] },
                { emoji: '🕊️', shortcodes: ['dove'] },
                { emoji: '🐇', shortcodes: ['rabbit2'] },
                { emoji: '🐁', shortcodes: ['mouse2'] },
                { emoji: '🐀', shortcodes: ['rat'] },
                { emoji: '🐿️', shortcodes: ['chipmunk'] },
                { emoji: '🦔', shortcodes: ['hedgehog'] },
                { emoji: '🦫', shortcodes: ['beaver'] },
                { emoji: '🦨', shortcodes: ['skunk'] },
                { emoji: '🦡', shortcodes: ['badger'] }
            ],

            plantsAndFlowers: [
                { emoji: '🌹', shortcodes: ['rose'] },
                { emoji: '🥀', shortcodes: ['wilted_flower'] },
                { emoji: '🌷', shortcodes: ['tulip'] },
                { emoji: '🪻', shortcodes: ['hyacinth'] },
                { emoji: '🌻', shortcodes: ['sunflower'] },
                { emoji: '🌸', shortcodes: ['cherry_blossom'] },
                { emoji: '🌺', shortcodes: ['hibiscus'] },
                { emoji: '🌼', shortcodes: ['blossom'] },
                { emoji: '🪷', shortcodes: ['lotus'] },
                { emoji: '💐', shortcodes: ['bouquet'] },
                { emoji: '🌱', shortcodes: ['seedling'] },
                { emoji: '🪴', shortcodes: ['potted_plant'] },
                { emoji: '🌿', shortcodes: ['herb'] },
                { emoji: '☘️', shortcodes: ['shamrock'] },
                { emoji: '🍀', shortcodes: ['four_leaf_clover'] },
                { emoji: '🎋', shortcodes: ['tanabata_tree'] },
                { emoji: '🌲', shortcodes: ['evergreen_tree'] },
                { emoji: '🌳', shortcodes: ['deciduous_tree'] },
                { emoji: '🌴', shortcodes: ['palm_tree'] },
                { emoji: '🌵', shortcodes: ['cactus'] },
                { emoji: '🌾', shortcodes: ['sheaf_of_rice'] },
                { emoji: '🍁', shortcodes: ['maple_leaf'] },
                { emoji: '🍂', shortcodes: ['fallen_leaf'] },
                { emoji: '🍃', shortcodes: ['leaf_fluttering_in_wind'] },
                { emoji: '🪹', shortcodes: ['empty_nest'] },
                { emoji: '🪺', shortcodes: ['nest_with_eggs'] },
                { emoji: '🍄', shortcodes: ['mushroom'] }
            ],

            foodAndDrink: [
                { emoji: '🍕', shortcodes: ['pizza'] },
                { emoji: '🍔', shortcodes: ['burger', 'hamburger'] },
                { emoji: '🍟', shortcodes: ['fries'] },
                { emoji: '🌭', shortcodes: ['hotdog'] },
                { emoji: '🥪', shortcodes: ['sandwich'] },
                { emoji: '🌮', shortcodes: ['taco'] },
                { emoji: '🌯', shortcodes: ['burrito'] },
                { emoji: '🥙', shortcodes: ['stuffed_flatbread'] },
                { emoji: '🧆', shortcodes: ['falafel'] },
                { emoji: '🍣', shortcodes: ['sushi'] },
                { emoji: '🍱', shortcodes: ['bento'] },
                { emoji: '🍛', shortcodes: ['curry'] },
                { emoji: '🍜', shortcodes: ['ramen'] },
                { emoji: '🍝', shortcodes: ['spaghetti'] },
                { emoji: '🥗', shortcodes: ['salad', 'green_salad'] },
                { emoji: '🍿', shortcodes: ['popcorn'] },
                { emoji: '🍎', shortcodes: ['apple'] },
                { emoji: '🍏', shortcodes: ['green_apple'] },
                { emoji: '🍐', shortcodes: ['pear'] },
                { emoji: '🍌', shortcodes: ['banana'] },
                { emoji: '🍉', shortcodes: ['watermelon'] },
                { emoji: '🍇', shortcodes: ['grapes'] },
                { emoji: '🍓', shortcodes: ['strawberry'] },
                { emoji: '🫐', shortcodes: ['blueberries'] },
                { emoji: '🍈', shortcodes: ['melon'] },
                { emoji: '🍒', shortcodes: ['cherries'] },
                { emoji: '🍑', shortcodes: ['peach'] },
                { emoji: '🍍', shortcodes: ['pineapple'] },
                { emoji: '🥭', shortcodes: ['mango'] },
                { emoji: '🥥', shortcodes: ['coconut'] },
                { emoji: '🥝', shortcodes: ['kiwi_fruit'] },
                { emoji: '🍅', shortcodes: ['tomato'] },
                { emoji: '🍆', shortcodes: ['eggplant'] },
                { emoji: '🥑', shortcodes: ['avocado'] },
                { emoji: '🥦', shortcodes: ['broccoli'] },
                { emoji: '🥕', shortcodes: ['carrot'] },
                { emoji: '🌽', shortcodes: ['corn'] },
                { emoji: '🌶️', shortcodes: ['pepper'] },
                { emoji: '🫒', shortcodes: ['olive'] },
                { emoji: '🧄', shortcodes: ['garlic'] },
                { emoji: '🧅', shortcodes: ['onion'] },
                { emoji: '🥔', shortcodes: ['potato'] },
                { emoji: '🍠', shortcodes: ['sweet_potato'] },
                { emoji: '🍞', shortcodes: ['bread'] },
                { emoji: '🥐', shortcodes: ['croissant'] },
                { emoji: '🥖', shortcodes: ['baguette_bread'] },
                { emoji: '🥨', shortcodes: ['pretzel'] },
                { emoji: '🥯', shortcodes: ['bagel'] },
                { emoji: '🥞', shortcodes: ['pancakes'] },
                { emoji: '🧇', shortcodes: ['waffle'] },
                { emoji: '🧀', shortcodes: ['cheese'] },
                { emoji: '🥚', shortcodes: ['egg'] },
                { emoji: '🥓', shortcodes: ['bacon'] },
                { emoji: '🥩', shortcodes: ['meat'] },
                { emoji: '🍗', shortcodes: ['poultry_leg'] },
                { emoji: '🍖', shortcodes: ['meat_on_bone'] },
                { emoji: '🍤', shortcodes: ['shrimp'] },
                { emoji: '🥟', shortcodes: ['dumpling'] },
                { emoji: '🥡', shortcodes: ['takeout_box'] },
                { emoji: '🍰', shortcodes: ['cake', 'shortcake'] },
                { emoji: '🎂', shortcodes: ['birthday'] },
                { emoji: '🧁', shortcodes: ['cupcake'] },
                { emoji: '🥧', shortcodes: ['pie'] },
                { emoji: '🍪', shortcodes: ['cookie'] },
                { emoji: '🍩', shortcodes: ['doughnut'] },
                { emoji: '🍫', shortcodes: ['chocolate_bar'] },
                { emoji: '🍬', shortcodes: ['candy'] },
                { emoji: '🍭', shortcodes: ['lollipop'] },
                { emoji: '🍮', shortcodes: ['custard'] },
                { emoji: '🍯', shortcodes: ['honey_pot'] },
                { emoji: '🍦', shortcodes: ['icecream'] },
                { emoji: '🍨', shortcodes: ['ice_cream'] },
                { emoji: '🍧', shortcodes: ['shaved_ice'] },
                { emoji: '☕', shortcodes: ['coffee'] },
                { emoji: '🍵', shortcodes: ['tea'] },
                { emoji: '🧋', shortcodes: ['bubble_tea'] },
                { emoji: '🥛', shortcodes: ['milk'] },
                { emoji: '🍹', shortcodes: ['tropical_drink'] },
                { emoji: '🍸', shortcodes: ['cocktail'] },
                { emoji: '🍷', shortcodes: ['wine_glass'] },
                { emoji: '🍺', shortcodes: ['beer'] },
                { emoji: '🍻', shortcodes: ['beers'] },
                { emoji: '🥂', shortcodes: ['clinking_glasses'] },
                { emoji: '🥃', shortcodes: ['whiskey'] },
                { emoji: '🥤', shortcodes: ['cup_with_straw'] },
                { emoji: '🧃', shortcodes: ['beverage_box'] },
                { emoji: '🧉', shortcodes: ['mate'] },
                { emoji: '🧊', shortcodes: ['ice_cube'] },
                { emoji: '🥢', shortcodes: ['chopsticks'] },
                { emoji: '🍽️', shortcodes: ['plate_with_cutlery'] },
                { emoji: '🍴', shortcodes: ['fork_and_knife'] },
                { emoji: '🥄', shortcodes: ['spoon'] },
                { emoji: '🔪', shortcodes: ['hocho', 'knife'] },
                { emoji: '🏺', shortcodes: ['amphora'] }
            ],

            activitiesAndSports: [
                { emoji: '⚽', shortcodes: ['soccer'] },
                { emoji: '🏀', shortcodes: ['basketball'] },
                { emoji: '🎾', shortcodes: ['tennis'] },
                { emoji: '🏈', shortcodes: ['football'] },
                { emoji: '⚾', shortcodes: ['baseball'] },
                { emoji: '🥎', shortcodes: ['softball'] },
                { emoji: '🏐', shortcodes: ['volleyball'] },
                { emoji: '🏉', shortcodes: ['rugby_football'] },
                { emoji: '⛳', shortcodes: ['golf'] },
                { emoji: '🏓', shortcodes: ['ping_pong'] },
                { emoji: '🏸', shortcodes: ['badminton'] },
                { emoji: '🥊', shortcodes: ['boxing_glove'] },
                { emoji: '🥋', shortcodes: ['martial_arts_uniform'] },
                { emoji: '🥅', shortcodes: ['goal_net'] },
                { emoji: '⛸️', shortcodes: ['ice_skate'] },
                { emoji: '🎿', shortcodes: ['ski'] },
                { emoji: '🛷', shortcodes: ['sled'] },
                { emoji: '⛷️', shortcodes: ['skier'] },
                { emoji: '🏂', shortcodes: ['snowboarder'] },
                { emoji: '🏃', shortcodes: ['run', 'running'] },
                { emoji: '🚶', shortcodes: ['walk'] },
                { emoji: '🏊', shortcodes: ['swim', 'swimming'] },
                { emoji: '🏄', shortcodes: ['surfing'] },
                { emoji: '🚣', shortcodes: ['rowboat', 'rowing'] },
                { emoji: '🚴', shortcodes: ['cycle', 'biking', 'bicycle'] },
                { emoji: '🚵', shortcodes: ['mountain_biking'] },
                { emoji: '🏋️', shortcodes: ['weight_lifting'] },
                { emoji: '🧘', shortcodes: ['person_in_lotus_position'] },
                { emoji: '💃', shortcodes: ['dancer'] },
                { emoji: '🕺', shortcodes: ['man_dancing'] },
                { emoji: '🤸', shortcodes: ['cartwheel'] },
                { emoji: '🤺', shortcodes: ['fencing'] },
                { emoji: '🏇', shortcodes: ['horse_racing'] },
                { emoji: '🧗', shortcodes: ['climbing'] },
                { emoji: '🎭', shortcodes: ['performing_arts'] },
                { emoji: '🖼️', shortcodes: ['framed_picture'] },
                { emoji: '🎨', shortcodes: ['art'] },
                { emoji: '🧵', shortcodes: ['thread'] },
                { emoji: '🧶', shortcodes: ['yarn'] },
                { emoji: '🎵', shortcodes: ['musical_note'] },
                { emoji: '🎶', shortcodes: ['notes'] },
                { emoji: '🎼', shortcodes: ['musical_score'] },
                { emoji: '🎹', shortcodes: ['musical_keyboard', 'keyboard'] },
                { emoji: '🎷', shortcodes: ['saxophone'] },
                { emoji: '🎺', shortcodes: ['trumpet'] },
                { emoji: '🎸', shortcodes: ['guitar'] },
                { emoji: '🪕', shortcodes: ['banjo'] },
                { emoji: '🎻', shortcodes: ['violin'] },
                { emoji: '🥁', shortcodes: ['drum'] },
                { emoji: '🪗', shortcodes: ['accordion'] },
                { emoji: '🎬', shortcodes: ['clapper'] },
                { emoji: '🎮', shortcodes: ['video_game'] },
                { emoji: '👾', shortcodes: ['alien_monster'] },
                { emoji: '🎯', shortcodes: ['dart'] },
                { emoji: '🎰', shortcodes: ['slot_machine'] },
                { emoji: '🎲', shortcodes: ['game_die'] },
                { emoji: '🧩', shortcodes: ['puzzle_piece'] },
                { emoji: '♟️', shortcodes: ['chess_pawn'] },
                { emoji: '🧸', shortcodes: ['teddy_bear'] },
                { emoji: '🪄', shortcodes: ['magic_wand'] },
                { emoji: '🪅', shortcodes: ['piñata'] },
                { emoji: '🪩', shortcodes: ['mirror_ball'] },
                { emoji: '🪆', shortcodes: ['nesting_dolls'] },
                { emoji: '🃏', shortcodes: ['joker'] },
                { emoji: '🀄', shortcodes: ['mahjong'] },
                { emoji: '🎴', shortcodes: ['flower_playing_cards'] },
                { emoji: '🥇', shortcodes: ['first_place_medal'] },
                { emoji: '🥈', shortcodes: ['second_place_medal'] },
                { emoji: '🥉', shortcodes: ['third_place_medal'] },
                { emoji: '🏆', shortcodes: ['trophy'] },
                { emoji: '🏅', shortcodes: ['medal'] },
                { emoji: '🎫', shortcodes: ['ticket'] },
                { emoji: '🎟️', shortcodes: ['admission_tickets'] }
            ],

            travelAndPlaces: [
                { emoji: '✈️', shortcodes: ['airplane'] },
                { emoji: '🛩️', shortcodes: ['small_airplane'] },
                { emoji: '🚁', shortcodes: ['helicopter'] },
                { emoji: '🚀', shortcodes: ['rocket'] },
                { emoji: '🚆', shortcodes: ['train'] },
                { emoji: '🚇', shortcodes: ['metro'] },
                { emoji: '🚊', shortcodes: ['tram'] },
                { emoji: '🚗', shortcodes: ['car'] },
                { emoji: '🚕', shortcodes: ['taxi'] },
                { emoji: '🚙', shortcodes: ['blue_car'] },
                { emoji: '🚌', shortcodes: ['bus'] },
                { emoji: '🚐', shortcodes: ['minibus'] },
                { emoji: '🚚', shortcodes: ['truck'] },
                { emoji: '🚜', shortcodes: ['tractor'] },
                { emoji: '🏍️', shortcodes: ['motorcycle'] },
                { emoji: '🚲', shortcodes: ['bike'] },
                { emoji: '🛴', shortcodes: ['kick_scooter'] },
                { emoji: '🦽', shortcodes: ['wheelchair'] },
                { emoji: '🚢', shortcodes: ['ship'] },
                { emoji: '⛴️', shortcodes: ['ferry'] },
                { emoji: '⛵', shortcodes: ['sailboat'] },
                { emoji: '🛶', shortcodes: ['canoe'] },
                { emoji: '⚓', shortcodes: ['anchor'] },
                { emoji: '⛽', shortcodes: ['fuelpump'] },
                { emoji: '🚥', shortcodes: ['traffic_light'] },
                { emoji: '🚧', shortcodes: ['construction'] },
                { emoji: '🏨', shortcodes: ['hotel'] },
                { emoji: '🏠', shortcodes: ['house'] },
                { emoji: '🏡', shortcodes: ['house_with_garden'] },
                { emoji: '🏢', shortcodes: ['office'] },
                { emoji: '🏬', shortcodes: ['department_store'] },
                { emoji: '🏫', shortcodes: ['school'] },
                { emoji: '🏥', shortcodes: ['hospital'] },
                { emoji: '🏦', shortcodes: ['bank'] },
                { emoji: '🏣', shortcodes: ['post_office'] },
                { emoji: '🏟️', shortcodes: ['stadium'] },
                { emoji: '🏛️', shortcodes: ['classical_building'] },
                { emoji: '🏭', shortcodes: ['factory'] },
                { emoji: '🏰', shortcodes: ['castle'] },
                { emoji: '🏯', shortcodes: ['japanese_castle'] },
                { emoji: '🌉', shortcodes: ['bridge'] },
                { emoji: '🎡', shortcodes: ['ferris_wheel'] },
                { emoji: '🎢', shortcodes: ['roller_coaster'] },
                { emoji: '🏖️', shortcodes: ['beach', 'beach_with_umbrella'] },
                { emoji: '🏜️', shortcodes: ['desert'] },
                { emoji: '🏝️', shortcodes: ['island'] },
                { emoji: '⛰️', shortcodes: ['mountain'] },
                { emoji: '🌋', shortcodes: ['volcano'] },
                { emoji: '🏕️', shortcodes: ['camping'] },
                { emoji: '⛺', shortcodes: ['tent'] },
                { emoji: '🏞️', shortcodes: ['national_park'] },
                { emoji: '🏙️', shortcodes: ['cityscape'] },
                { emoji: '🌇', shortcodes: ['sunset'] },
                { emoji: '🌆', shortcodes: ['city_at_dusk'] },
                { emoji: '🌃', shortcodes: ['night_with_stars'] },
                { emoji: '🌉', shortcodes: ['bridge_at_night'] },
                { emoji: '🌌', shortcodes: ['milky_way'] },
                { emoji: '🎠', shortcodes: ['carousel_horse'] },
                { emoji: '🎡', shortcodes: ['ferris_wheel'] },
                { emoji: '🎢', shortcodes: ['roller_coaster'] },
                { emoji: '💈', shortcodes: ['barber'] },
                { emoji: '🎪', shortcodes: ['circus_tent'] }
            ],

            weatherAndNatureExtras: [
                { emoji: '☀️', shortcodes: ['sun'] },
                { emoji: '🌞', shortcodes: ['sun_with_face'] },
                { emoji: '🌤️', shortcodes: ['sun_behind_small_cloud'] },
                { emoji: '⛅', shortcodes: ['sun_behind_cloud'] },
                { emoji: '🌥️', shortcodes: ['sun_behind_large_cloud'] },
                { emoji: '☁️', shortcodes: ['cloud'] },
                { emoji: '🌦️', shortcodes: ['sun_behind_rain_cloud'] },
                { emoji: '🌧️', shortcodes: ['cloud_with_rain', 'rain'] },
                { emoji: '🌨️', shortcodes: ['cloud_with_snow'] },
                { emoji: '🌩️', shortcodes: ['thunder', 'lightning'] },
                { emoji: '⚡', shortcodes: ['zap', 'high_voltage'] },
                { emoji: '❄️', shortcodes: ['snow', 'snowflake'] },
                { emoji: '☃️', shortcodes: ['snowman'] },
                { emoji: '⛄', shortcodes: ['snowman_without_snow'] },
                { emoji: '🌪️', shortcodes: ['tornado'] },
                { emoji: '🌫️', shortcodes: ['fog'] },
                { emoji: '🌬️', shortcodes: ['wind_face'] },
                { emoji: '🌀', shortcodes: ['cyclone'] },
                { emoji: '🌈', shortcodes: ['rainbow'] },
                { emoji: '🌂', shortcodes: ['closed_umbrella'] },
                { emoji: '☔', shortcodes: ['umbrella', 'umbrella_with_rain_drops'] },
                { emoji: '💧', shortcodes: ['droplet'] },
                { emoji: '💦', shortcodes: ['sweat_drops'] },
                { emoji: '🌊', shortcodes: ['ocean', 'water_wave'] },
                { emoji: '🌙', shortcodes: ['moon', 'crescent_moon'] },
                { emoji: '🌑', shortcodes: ['new_moon'] },
                { emoji: '🌓', shortcodes: ['first_quarter_moon'] },
                { emoji: '🌕', shortcodes: ['full_moon'] },
                { emoji: '🌗', shortcodes: ['last_quarter_moon'] },
                { emoji: '🪐', shortcodes: ['saturn'] },
                { emoji: '☄️', shortcodes: ['comet'] },
                { emoji: '🔥', shortcodes: ['fire'] },
                { emoji: '🌡️', shortcodes: ['thermometer'] },
                { emoji: '🌎', shortcodes: ['earth_americas'] },
                { emoji: '🌍', shortcodes: ['earth_africa'] },
                { emoji: '🌏', shortcodes: ['earth_asia'] },
                { emoji: '🌐', shortcodes: ['globe_with_meridians'] }
            ],

            techAndObjectsExtra: [
                { emoji: '🖱️', shortcodes: ['computer_mouse'] },
                { emoji: '🖲️', shortcodes: ['trackball'] },
                { emoji: '🕹️', shortcodes: ['joystick'] },
                { emoji: '🎮', shortcodes: ['video_game'] },
                { emoji: '📀', shortcodes: ['dvd'] },
                { emoji: '💿', shortcodes: ['cd'] },
                { emoji: '💾', shortcodes: ['floppy_disk'] },
                { emoji: '📟', shortcodes: ['pager'] },
                { emoji: '📠', shortcodes: ['fax'] },
                { emoji: '📺', shortcodes: ['tv'] },
                { emoji: '📻', shortcodes: ['radio'] },
                { emoji: '🛰️', shortcodes: ['satellite'] },
                { emoji: '📡', shortcodes: ['satellite_antenna'] },
                { emoji: '📽️', shortcodes: ['film_projector', 'projector'] },
                { emoji: '⌚', shortcodes: ['watch'] },
                { emoji: '⏱️', shortcodes: ['timer', 'stopwatch'] },
                { emoji: '⌛', shortcodes: ['hourglass'] },
                { emoji: '⏳', shortcodes: ['hourglass_flowing_sand'] },
                { emoji: '🔦', shortcodes: ['flashlight'] },
                { emoji: '🕯️', shortcodes: ['candle'] },
                { emoji: '💡', shortcodes: ['bulb'] },
                { emoji: '🔌', shortcodes: ['electric_plug', 'usb'] },
                { emoji: '🧮', shortcodes: ['abacus'] },
                { emoji: '🔬', shortcodes: ['microscope'] },
                { emoji: '🔭', shortcodes: ['telescope'] },
                { emoji: '🧪', shortcodes: ['test_tube'] },
                { emoji: '🧫', shortcodes: ['petri_dish'] },
                { emoji: '🧬', shortcodes: ['dna'] },
                { emoji: '💊', shortcodes: ['pill'] },
                { emoji: '💉', shortcodes: ['syringe'] },
                { emoji: '🩹', shortcodes: ['adhesive_bandage'] },
                { emoji: '🩺', shortcodes: ['stethoscope'] },
                { emoji: '⚖️', shortcodes: ['balance_scale'] },
                { emoji: '🧱', shortcodes: ['brick'] },
                { emoji: '⛓️', shortcodes: ['chain'] },
                { emoji: '🪝', shortcodes: ['hook'] },
                { emoji: '🪜', shortcodes: ['ladder'] },
                { emoji: '🧰', shortcodes: ['toolbox'] },
                { emoji: '🧲', shortcodes: ['magnet'] },
                { emoji: '🧯', shortcodes: ['fire_extinguisher'] },
                { emoji: '🛒', shortcodes: ['shopping_cart'] },
                { emoji: '🧹', shortcodes: ['broom'] },
                { emoji: '🧺', shortcodes: ['basket'] },
                { emoji: '🧻', shortcodes: ['toilet_paper'] },
                { emoji: '🧼', shortcodes: ['soap'] },
                { emoji: '🧽', shortcodes: ['sponge'] },
                { emoji: '🧴', shortcodes: ['lotion_bottle'] },
                { emoji: '🪠', shortcodes: ['plunger'] }
            ],

            uiSymbolsExtra: [
                { emoji: '▶️', shortcodes: ['play'] },
                { emoji: '⏸️', shortcodes: ['pause'] },
                { emoji: '⏹️', shortcodes: ['stop'] },
                { emoji: '⏺️', shortcodes: ['record'] },
                { emoji: '⏩', shortcodes: ['fast_forward'] },
                { emoji: '⏪', shortcodes: ['rewind'] },
                { emoji: '⏭️', shortcodes: ['next'] },
                { emoji: '⏮️', shortcodes: ['previous'] },
                { emoji: '🔂', shortcodes: ['repeat_one'] },
                { emoji: '🔁', shortcodes: ['repeat'] },
                { emoji: '🔀', shortcodes: ['shuffle'] },
                { emoji: 'ℹ️', shortcodes: ['info'] },
                { emoji: '⬆️', shortcodes: ['arrow_up'] },
                { emoji: '⬇️', shortcodes: ['arrow_down'] },
                { emoji: '⬅️', shortcodes: ['arrow_left'] },
                { emoji: '➡️', shortcodes: ['arrow_right'] },
                { emoji: '↕️', shortcodes: ['arrow_up_down'] },
                { emoji: '↔️', shortcodes: ['left_right_arrow'] },
                { emoji: '↩️', shortcodes: ['leftwards_arrow_with_hook'] },
                { emoji: '↪️', shortcodes: ['arrow_right_hook'] },
                { emoji: '➕', shortcodes: ['plus'] },
                { emoji: '➖', shortcodes: ['minus'] },
                { emoji: '➗', shortcodes: ['divide'] },
                { emoji: '✖️', shortcodes: ['multiply'] },
                { emoji: '♾️', shortcodes: ['infinity'] },
                { emoji: '💲', shortcodes: ['dollar'] },
                { emoji: '💱', shortcodes: ['currency_exchange'] },
                { emoji: '™️', shortcodes: ['tm'] },
                { emoji: '©️', shortcodes: ['copyright'] },
                { emoji: '®️', shortcodes: ['registered'] },
                { emoji: '🔚', shortcodes: ['end'] },
                { emoji: '🔙', shortcodes: ['back'] },
                { emoji: '🔝', shortcodes: ['top'] },
                { emoji: '🔜', shortcodes: ['soon'] },
                { emoji: '🧿', shortcodes: ['nazar_amulet'] },
                { emoji: '🪬', shortcodes: ['hamsa'] },
                { emoji: '☸️', shortcodes: ['wheel_of_dharma'] },
                { emoji: '☮️', shortcodes: ['peace_symbol'] },
                { emoji: '✝️', shortcodes: ['latin_cross'] },
                { emoji: '☪️', shortcodes: ['star_and_crescent'] },
                { emoji: '🕉️', shortcodes: ['om'] },
                { emoji: '✡️', shortcodes: ['star_of_david'] },
                { emoji: '🔯', shortcodes: ['dotted_six_pointed_star'] },
                { emoji: '🕎', shortcodes: ['menorah'] },
                { emoji: '☯️', shortcodes: ['yin_yang'] }
            ],

            communicationAndMedia: [
                { emoji: '✉️', shortcodes: ['email'] },
                { emoji: '📨', shortcodes: ['incoming_envelope'] },
                { emoji: '📧', shortcodes: ['e-mail'] },
                { emoji: '📩', shortcodes: ['envelope_with_arrow'] },
                { emoji: '📤', shortcodes: ['outbox'] },
                { emoji: '📥', shortcodes: ['inbox'] },
                { emoji: '📦', shortcodes: ['package'] },
                { emoji: '📫', shortcodes: ['mailbox'] },
                { emoji: '📪', shortcodes: ['mailbox_closed'] },
                { emoji: '📬', shortcodes: ['mailbox_with_mail'] },
                { emoji: '📭', shortcodes: ['mailbox_with_no_mail'] },
                { emoji: '📮', shortcodes: ['postbox'] },
                { emoji: '🗳️', shortcodes: ['ballot_box'] },
                { emoji: '📢', shortcodes: ['loudspeaker'] },
                { emoji: '📣', shortcodes: ['megaphone'] },
                { emoji: '💬', shortcodes: ['speech_balloon'] },
                { emoji: '💭', shortcodes: ['thought_balloon'] },
                { emoji: '🗨️', shortcodes: ['left_speech_bubble'] },
                { emoji: '🗯️', shortcodes: ['right_anger_bubble'] },
                { emoji: '📞', shortcodes: ['telephone'] },
                { emoji: '📲', shortcodes: ['calling'] },
                { emoji: '📯', shortcodes: ['postal_horn'] },
                { emoji: '📰', shortcodes: ['newspaper'] },
                { emoji: '🗞️', shortcodes: ['rolled_up_newspaper'] },
                { emoji: '📑', shortcodes: ['bookmark_tabs'] },
                { emoji: '🔖', shortcodes: ['bookmark'] },
                { emoji: '🏷️', shortcodes: ['label'] },
                { emoji: '💻', shortcodes: ['laptop', 'computer'] },
                { emoji: '⌨️', shortcodes: ['keyboard'] },
                { emoji: '🖥️', shortcodes: ['desktop_computer'] },
                { emoji: '🖨️', shortcodes: ['printer'] },
                { emoji: '🖱️', shortcodes: ['mouse'] },
                { emoji: '🖲️', shortcodes: ['trackball'] },
                { emoji: '🕹️', shortcodes: ['joystick'] },
                { emoji: '📷', shortcodes: ['camera'] },
                { emoji: '📸', shortcodes: ['camera_with_flash'] },
                { emoji: '📹', shortcodes: ['video_camera'] },
                { emoji: '🎥', shortcodes: ['movie_camera'] },
                { emoji: '🎬', shortcodes: ['clapper'] },
                { emoji: '🎞️', shortcodes: ['film_frames'] },
                { emoji: '📽️', shortcodes: ['projector'] },
                { emoji: '📺', shortcodes: ['tv'] },
                { emoji: '📻', shortcodes: ['radio'] },
                { emoji: '🎙️', shortcodes: ['studio_microphone'] },
                { emoji: '🎧', shortcodes: ['headphones'] }
            ],

            flagsBasic: [
                { emoji: '🇩🇪', shortcodes: ['flag_de'] },
                { emoji: '🇦🇹', shortcodes: ['flag_at'] },
                { emoji: '🇨🇭', shortcodes: ['flag_ch'] },
                { emoji: '🇺🇸', shortcodes: ['flag_us'] },
                { emoji: '🇬🇧', shortcodes: ['flag_gb', 'flag_uk'] },
                { emoji: '🇫🇷', shortcodes: ['flag_fr'] },
                { emoji: '🇪🇸', shortcodes: ['flag_es'] },
                { emoji: '🇮🇹', shortcodes: ['flag_it'] },
                { emoji: '🇵🇹', shortcodes: ['flag_pt'] },
                { emoji: '🇳🇱', shortcodes: ['flag_nl'] },
                { emoji: '🇧🇪', shortcodes: ['flag_be'] },
                { emoji: '🇱🇺', shortcodes: ['flag_lu'] },
                { emoji: '🇵🇱', shortcodes: ['flag_pl'] },
                { emoji: '🇨🇿', shortcodes: ['flag_cz'] },
                { emoji: '🇸🇰', shortcodes: ['flag_sk'] },
                { emoji: '🇭🇺', shortcodes: ['flag_hu'] },
                { emoji: '🇷🇴', shortcodes: ['flag_ro'] },
                { emoji: '🇧🇬', shortcodes: ['flag_bg'] },
                { emoji: '🇭🇷', shortcodes: ['flag_hr'] },
                { emoji: '🇸🇮', shortcodes: ['flag_si'] },
                { emoji: '🇬🇷', shortcodes: ['flag_gr'] },
                { emoji: '🇹🇷', shortcodes: ['flag_tr'] },
                { emoji: '🇺🇦', shortcodes: ['flag_ua'] },
                { emoji: '🇷🇺', shortcodes: ['flag_ru'] },
                { emoji: '🇨🇦', shortcodes: ['flag_ca'] },
                { emoji: '🇲🇽', shortcodes: ['flag_mx'] },
                { emoji: '🇧🇷', shortcodes: ['flag_br'] },
                { emoji: '🇦🇷', shortcodes: ['flag_ar'] },
                { emoji: '🇨🇱', shortcodes: ['flag_cl'] },
                { emoji: '🇨🇴', shortcodes: ['flag_co'] },
                { emoji: '🇦🇺', shortcodes: ['flag_au'] },
                { emoji: '🇳🇿', shortcodes: ['flag_nz'] },
                { emoji: '🇮🇳', shortcodes: ['flag_in'] },
                { emoji: '🇨🇳', shortcodes: ['flag_cn'] },
                { emoji: '🇯🇵', shortcodes: ['flag_jp'] },
                { emoji: '🇰🇷', shortcodes: ['flag_kr'] },
                { emoji: '🇹🇭', shortcodes: ['flag_th'] },
                { emoji: '🇻🇳', shortcodes: ['flag_vn'] },
                { emoji: '🇮🇩', shortcodes: ['flag_id'] },
                { emoji: '🇵🇭', shortcodes: ['flag_ph'] },
                { emoji: '🇲🇾', shortcodes: ['flag_my'] },
                { emoji: '🇸🇬', shortcodes: ['flag_sg'] },
                { emoji: '🇿🇦', shortcodes: ['flag_za'] },
                { emoji: '🏁', shortcodes: ['chequered_flag'] },
                { emoji: '🚩', shortcodes: ['triangular_flag'] },
                { emoji: '🎌', shortcodes: ['crossed_flags'] },
                { emoji: '🏴‍☠️', shortcodes: ['pirate_flag'] },
                { emoji: '🏳️‍🌈', shortcodes: ['rainbow_flag'] },
                { emoji: '🏳️‍⚧️', shortcodes: ['transgender_flag'] },
                { emoji: '🇪🇺', shortcodes: ['flag_eu'] },
                { emoji: '🇺🇳', shortcodes: ['flag_un'] },
                { emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', shortcodes: ['flag_england'] },
                { emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', shortcodes: ['flag_scotland'] },
                { emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', shortcodes: ['flag_wales'] },
                { emoji: '🏴', shortcodes: ['black_flag'] },
                { emoji: '🏳️', shortcodes: ['white_flag'] }
            ]
        }
    };

    const pluginFunctions = {
        globalEventsBound: false,
        _shortcodeMapCache: null,

        setSettings($wrapper, settings) {
            $wrapper.data(DATA_KEY, settings);
        },

        getSettings($wrapper) {
            return $wrapper.data(DATA_KEY) || null;
        },

        getDropdown($wrapper) {
            return $wrapper.find(`.${DROPDOWN_CLASS}`).first();
        },

        getTarget(settings) {
            if (!settings || !settings.targetInput) return $();
            return $(settings.targetInput).first();
        },

        isTextInput($el) {
            if (!$el || !$el.length) return false;
            const tag = ($el[0].tagName || '').toLowerCase();
            return tag === 'input' || tag === 'textarea';
        },

        isContentEditable($el) {
            return !!($el && $el.length && $el[0].isContentEditable);
        },

        normalizeDomInput(root) {
            if (!root) return $();
            if (root.jquery) return root;
            if (root instanceof Element || root === document || root === window) return $(root);
            if (typeof root === 'object' && typeof root.length === 'number') return $(root);
            if (typeof root === 'string') {
                try {
                    return $(root);
                } catch (e) {
                    return $();
                }
            }
            return $();
        },

        escapeHtml(str) {
            return String(str)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#039;');
        },

        getEmojiData() {
            return $.bsEmojiPicker.emojiData || {};
        },

        getAsciiMap() {
            return Array.isArray($.bsEmojiPicker.asciiMap) ? $.bsEmojiPicker.asciiMap : [];
        },

        buildShortcodeMap() {
            const cache = Object.create(null);
            const data = this.getEmojiData();

            Object.keys(data).forEach((categoryKey) => {
                const list = Array.isArray(data[categoryKey]) ? data[categoryKey] : [];
                list.forEach((item) => {
                    if (!item || typeof item.emoji !== 'string') return;
                    const codes = Array.isArray(item.shortcodes) ? item.shortcodes : [];
                    codes.forEach((code) => {
                        const key = String(code || '').trim().toLowerCase();
                        if (!key) return;
                        if (!(key in cache)) {
                            cache[key] = item.emoji;
                        }
                    });
                });
            });

            this._shortcodeMapCache = cache;
            return cache;
        },

        getShortcodeMap() {
            if (this._shortcodeMapCache) return this._shortcodeMapCache;
            return this.buildShortcodeMap();
        },

        invalidateCaches() {
            this._shortcodeMapCache = null;
        },

        getCategoryOrder(settings) {
            const labels = settings && settings.labels ? settings.labels : $.bsEmojiPicker.defaults.labels;
            return Object.keys(labels || {});
        },

        buildCategoryIndex(settings) {
            const labels = settings.labels || {};
            const data = this.getEmojiData();
            const order = this.getCategoryOrder(settings);
            const categories = [];
            const pushed = new Set();

            const appendCategory = (key) => {
                const list = Array.isArray(data[key]) ? data[key] : [];
                categories.push({
                    key,
                    label: labels[key] || key,
                    items: list
                        .filter((item) => item && typeof item.emoji === 'string')
                        .map((item) => ({
                            emoji: item.emoji,
                            shortcodes: Array.isArray(item.shortcodes) ? item.shortcodes.slice() : []
                        }))
                });
                pushed.add(key);
            };

            order.forEach((key) => appendCategory(key));

            Object.keys(data)
                .filter((key) => !pushed.has(key))
                .sort((a, b) => String(a).localeCompare(String(b)))
                .forEach((key) => appendCategory(key));

            return categories;
        },

        replaceShortcodes(str) {
            const shortcodeMap = this.getShortcodeMap();

            return String(str).replace(/:([a-z0-9_+\-]+):/gi, (match, code) => {
                const normalized = String(code || '').toLowerCase();
                return shortcodeMap[normalized] || match;
            });
        },

        replaceAscii(str) {
            let output = String(str);
            const rules = this.getAsciiMap();

            for (const entry of rules) {
                if (!entry || !(entry.re instanceof RegExp) || typeof entry.emoji !== 'string') continue;
                output = output.replace(entry.re, entry.emoji);
            }

            return output;
        },

        emojifyText(str) {
            if (typeof str !== 'string') {
                throw new TypeError('emojifyText expects a string');
            }

            let output = str;
            output = this.replaceShortcodes(output);
            output = this.replaceAscii(output);
            return output;
        },

        emojifyHtml(html) {
            if (typeof html !== 'string') {
                throw new TypeError('emojifyHtml expects a string');
            }

            const $tmp = $('<div>').html(html);
            this.emojifyDom($tmp);
            return $tmp.html();
        },

        emojifyDom(root) {
            const $list = this.normalizeDomInput(root);

            if (!$list.length) {
                throw new TypeError('emojifyDom expects DOM, jQuery, NodeList, array-like or selector');
            }

            $list.each((_, node) => {
                const el = node;
                if (!el) return;

                if (this.isTextInput($(el)) || this.isContentEditable($(el))) {
                    this.emojifyTarget($(el));
                    return;
                }

                const walker = document.createTreeWalker(
                    el,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode(textNode) {
                            const parent = textNode.parentNode;
                            if (!parent) return NodeFilter.FILTER_REJECT;

                            const tag = (parent.nodeName || '').toLowerCase();
                            if (
                                tag === 'script' ||
                                tag === 'style' ||
                                tag === 'noscript' ||
                                tag === 'textarea' ||
                                tag === 'template' ||
                                tag === 'input'
                            ) {
                                return NodeFilter.FILTER_REJECT;
                            }

                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                );

                const nodes = [];
                let current;
                while ((current = walker.nextNode())) {
                    nodes.push(current);
                }

                for (const textNode of nodes) {
                    const original = textNode.nodeValue;
                    const replaced = this.emojifyText(original);
                    if (replaced !== original) {
                        textNode.nodeValue = replaced;
                    }
                }
            });

            return $list;
        },

        emojifyContenteditable($editable) {
            if (!this.isContentEditable($editable)) {
                throw new TypeError('Invalid contenteditable target');
            }

            const el = $editable[0];
            const selection = window.getSelection();

            let startNode = null;
            let startOffset = 0;

            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (el.contains(range.startContainer)) {
                    startNode = range.startContainer;
                    startOffset = range.startOffset;
                }
            }

            const walker = document.createTreeWalker(
                el,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(textNode) {
                        const parent = textNode.parentNode;
                        if (!parent) return NodeFilter.FILTER_REJECT;

                        const tag = (parent.nodeName || '').toLowerCase();
                        if (
                            tag === 'script' ||
                            tag === 'style' ||
                            tag === 'noscript' ||
                            tag === 'textarea' ||
                            tag === 'template'
                        ) {
                            return NodeFilter.FILTER_REJECT;
                        }

                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            const nodes = [];
            let current;
            while ((current = walker.nextNode())) {
                nodes.push(current);
            }

            let changed = false;
            let newCaretNode = null;
            let newCaretOffset = 0;

            for (const textNode of nodes) {
                const original = textNode.nodeValue;
                const replaced = this.emojifyText(original);

                if (startNode === textNode) {
                    const left = original.slice(0, startOffset);
                    newCaretOffset = this.emojifyText(left).length;
                    newCaretNode = textNode;
                }

                if (replaced !== original) {
                    textNode.nodeValue = replaced;
                    changed = true;
                }
            }

            if (changed && selection && newCaretNode && el.contains(newCaretNode)) {
                try {
                    const safeOffset = Math.min(newCaretOffset, newCaretNode.nodeValue.length);
                    const newRange = document.createRange();
                    newRange.setStart(newCaretNode, safeOffset);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                } catch (e) {
                    // ignore caret restore failure
                }
            }

            return $editable;
        },

        emojifyTarget($target) {
            if (!$target || !$target.length) {
                throw new TypeError('Invalid target');
            }

            if (this.isTextInput($target)) {
                const value = String($target.val() ?? '');
                const start = $target.prop('selectionStart') ?? value.length;
                const end = $target.prop('selectionEnd') ?? value.length;

                const before = value.slice(0, start);
                const middle = value.slice(start, end);
                const after = value.slice(end);

                const newBefore = this.emojifyText(before);
                const newMiddle = this.emojifyText(middle);
                const newAfter = this.emojifyText(after);

                const newValue = newBefore + newMiddle + newAfter;

                if (newValue !== value) {
                    $target.val(newValue);
                    const newCursor = newBefore.length + newMiddle.length;
                    $target.prop('selectionStart', newCursor);
                    $target.prop('selectionEnd', newCursor);
                }

                $target.addClass(LISTENER_CLASS);
                return $target;
            }

            if (this.isContentEditable($target)) {
                $target.addClass(LISTENER_CLASS);
                return this.emojifyContenteditable($target);
            }

            throw new TypeError('Target must be input, textarea or contenteditable');
        },

        insertEmojiAtCursorTextInput($target, emoji) {
            const value = String($target.val() ?? '');
            const start = $target.prop('selectionStart') ?? value.length;
            const end = $target.prop('selectionEnd') ?? value.length;
            const newValue = value.slice(0, start) + emoji + value.slice(end);
            const newCursor = start + emoji.length;

            $target.focus();
            $target.val(newValue);
            $target.prop('selectionStart', newCursor);
            $target.prop('selectionEnd', newCursor);
            $target.trigger('input');
        },

        insertEmojiAtCursorContenteditable($editable, emoji) {
            const el = $editable[0];
            if (!el || !el.isContentEditable) {
                throw new TypeError('Invalid contenteditable target');
            }

            const selection = window.getSelection();
            let range;

            if (selection && selection.rangeCount > 0) {
                const tempRange = selection.getRangeAt(0);
                if (el.contains(tempRange.commonAncestorContainer)) {
                    range = tempRange;
                }
            }

            if (!range) {
                el.focus();
                range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
            }

            range.deleteContents();

            const node = document.createTextNode(emoji);
            range.insertNode(node);

            const newRange = document.createRange();
            newRange.setStartAfter(node);
            newRange.collapse(true);

            if (selection) {
                selection.removeAllRanges();
                selection.addRange(newRange);
            }

            $editable.trigger('input');
        },

        insertEmojiAtCursor($target, emoji) {
            if (!$target || !$target.length) {
                throw new TypeError('Invalid target');
            }

            if (this.isTextInput($target)) {
                this.insertEmojiAtCursorTextInput($target, emoji);
                return;
            }

            if (this.isContentEditable($target)) {
                this.insertEmojiAtCursorContenteditable($target, emoji);
                return;
            }

            throw new TypeError('Target must be input, textarea or contenteditable');
        },

        isOnlyEmoji(input) {
            const text = String(input ?? '').trim();
            if (!text) return false;

            const withoutSpaces = text.replace(/\s+/g, '');
            const nonEmojiChars = withoutSpaces.replace(
                /(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\u200D)+/gu,
                ''
            );

            return nonEmojiChars.length === 0;
        },

        buildDropdown($wrapper) {
            const settings = this.getSettings($wrapper);
            $wrapper.empty();

            const index = $(`body .${DROPDOWN_CLASS}`).length + 1;

            const $dropdown = $('<div>', {
                class: `dropdown ${DROPDOWN_CLASS}`,
                'data-index': index
            }).appendTo($wrapper);

            const dropdownToggleClass = settings.btnShowToggle ? ' dropdown-toggle' : '';
            const buttonHtml = settings.btnText || `<i class="${this.escapeHtml(settings.btnIconClass)}"></i>`;

            $('<button>', {
                class: `${settings.btnClass}${dropdownToggleClass}`,
                type: 'button',
                'data-bs-toggle': 'dropdown',
                'aria-expanded': 'false',
                html: buttonHtml
            }).appendTo($dropdown);

            const $menu = $('<div>', {
                class: 'dropdown-menu p-0'
            }).appendTo($dropdown);

            const $menuWrapper = $('<div>', {
                class: 'dropdown-emoji-menu-wrapper',
                style: 'min-width:min(340px,100vw);max-width:min(520px,100vw);box-sizing:border-box;max-height:400px;overflow-y:auto;'
            }).appendTo($menu);

            // Directly attach scroll handler for better reliability than delegation
            $menuWrapper.on('scroll', (e) => {
                const $target = $(e.currentTarget);
                const $wrapper = $target.closest(`.${WRAPPER_CLASS}`);

                if ($wrapper.find('.js-emoji-search').val()) return;

                const $headers = $wrapper.find('.js-emoji-category-header');
                const $tabs = $wrapper.find('.js-emoji-tab-btn');
                const $stickyTop = $wrapper.find('.sticky-top').first();
                const stickyNavHeight = $stickyTop.outerHeight() || 82;
                let activeCategory = null;

                const scrollTop = $target.scrollTop();
                const isAtBottom = Math.abs(scrollTop + $target.innerHeight() - $target[0].scrollHeight) < 5;

                let lastCategory = null;
                $headers.each(function() {
                    const $header = $(this);
                    
                    const originalStyle = $header.attr('style') || '';
                    $header.css({ position: 'relative', top: '0' });
                    const realHeaderRect = $header[0].getBoundingClientRect();
                    $header.attr('style', originalStyle);

                    const containerRect = $target[0].getBoundingClientRect();
                    const offsetTop = realHeaderRect.top - containerRect.top + scrollTop;
                    
                    if (scrollTop >= offsetTop - stickyNavHeight - 5) {
                        activeCategory = $header.data('category');
                    }
                    lastCategory = $header.data('category');
                });

                if (isAtBottom && lastCategory) {
                    activeCategory = lastCategory;
                }

                if (!activeCategory && $headers.length) {
                    activeCategory = $headers.first().data('category');
                }

                if (activeCategory) {
                    $tabs.each(function() {
                        const $tab = $(this);
                        if ($tab.data('tab') === activeCategory) {
                            $tab.removeClass('text-muted').addClass('btn-light text-primary border-bottom border-primary').css({
                                'border-bottom': '2px solid var(--bs-primary)',
                                'background-color': 'rgba(var(--bs-primary-rgb), 0.1)',
                                'position': 'relative',
                                'z-index': '2'
                            });
                        } else {
                            $tab.removeClass('btn-light text-primary border-bottom border-primary').addClass('text-muted').css({
                                'border-bottom': '',
                                'background-color': '',
                                'position': '',
                                'z-index': ''
                            });
                        }
                    });
                }
            });

            const $stickyTop = $('<div>', {
                class: 'sticky-top bg-body border-bottom',
                style: 'z-index: 1020 !important;'
            }).appendTo($menuWrapper);

            const $searchWrap = $('<div>', {
                class: 'py-2 px-5'
            }).appendTo($stickyTop);

            $('<input>', {
                type: 'search',
                class: 'form-control rounded-pill form-control-sm js-emoji-search',
                placeholder: 'Search emojis',
                autocomplete: 'off'
            }).appendTo($searchWrap);

            $('<div>', {
                class: 'js-emoji-tabs-nav d-flex overflow-x-auto border-top'
            }).appendTo($stickyTop);

            $('<div>', {
                class: 'dropdown-emoji-list'
            }).appendTo($menuWrapper);

            this.fillDropdown($wrapper);
        },

        fillDropdown($wrapper, query = '') {
            const settings = this.getSettings($wrapper);
            const $dropdown = this.getDropdown($wrapper);
            const $list = $dropdown.find('.dropdown-emoji-list').first();
            const $tabsNav = $dropdown.find('.js-emoji-tabs-nav').first();
            const index = this.buildCategoryIndex(settings);
            const q = String(query || '').trim().toLowerCase();
            const icons = settings.categoryIcons || $.bsEmojiPicker.defaults.categoryIcons || {};

            // Recent Emojis
            const recent = JSON.parse(localStorage.getItem('bs-emoji-picker-recent') || '[]');
            if (recent.length && !index.some(c => c.key === 'recent')) {
                index.unshift({
                    key: 'recent',
                    label: 'Recently Used',
                    items: recent.map(e => ({ emoji: e, shortcodes: [] }))
                });
            }

            $list.empty();

            let activeTabKey = $wrapper.data('active-tab') || (index.length ? index[0].key : null);
            
            // Ensure the active tab exists in index (safety)
            if (activeTabKey && !index.some(c => c.key === activeTabKey)) {
                activeTabKey = index.length ? index[0].key : null;
            }

            // Re-render tabs nav if empty or search state changed
            if ($tabsNav.is(':empty') || (q && !$tabsNav.hasClass('d-none')) || (!q && $tabsNav.hasClass('d-none'))) {
                $tabsNav.empty();
                if (!q) {
                    $tabsNav.removeClass('d-none');
                    index.forEach((cat) => {
                        const iconClass = icons[cat.key] || 'bi-tag';
                        const $btn = $('<button>', {
                            type: 'button',
                            class: 'btn btn-sm border-0 rounded-0 flex-fill py-2 js-emoji-tab-btn text-muted',
                            'data-tab': cat.key,
                            'data-bs-auto-close': 'outside',
                            title: cat.label,
                            html: `<i class="${iconClass}"></i>`
                        }).appendTo($tabsNav);

                        if (cat.key === activeTabKey) {
                            $btn.removeClass('text-muted').addClass('btn-light text-primary border-bottom border-primary').css({
                                'border-bottom': '2px solid var(--bs-primary)',
                                'background-color': 'rgba(var(--bs-primary-rgb), 0.1)',
                                'position': 'relative',
                                'z-index': '2'
                            });
                        }
                    });
                } else {
                    $tabsNav.addClass('d-none');
                }
            }

            let anyShown = false;


            index.forEach(({ key, label, items }) => {
                const filtered = q
                    ? items.filter((item) => {
                        const haystack = [
                            item.emoji,
                            ...(Array.isArray(item.shortcodes) ? item.shortcodes : [])
                        ].join(' ').toLowerCase();

                        return haystack.includes(q);
                    })
                    : items;

                if (!filtered.length) return;

                anyShown = true;

                $('<div>', {
                    class: 'dropdown-header sticky-top bg-body py-1 js-emoji-category-header',
                    style: `top: ${q ? '48px' : '82px'}; z-index: 1010; font-size: 0.75rem;`, // Align below sticky top
                    text: label,
                    'data-category': key
                }).appendTo($list);

                const $grid = $('<div>', {
                    class: 'd-flex flex-wrap gap-1 px-1 pb-1 pt-1 js-emoji-grid'
                }).appendTo($list);

                filtered.forEach(({ emoji, shortcodes }) => {
                    const title = (shortcodes || []).map((code) => `:${code}:`).join('  |  ');

                    $('<button>', {
                        type: 'button',
                        class: 'd-inline-flex justify-content-center align-items-center border-0 rounded js-emoji-insert bg-transparent',
                        style: 'cursor:pointer;width:2rem;height:2rem;font-size:18px;',
                        'data-emoji': emoji,
                        title,
                        'aria-label': title || emoji,
                        text: emoji
                    }).appendTo($grid);
                });
            });

            if (!anyShown) {
                $('<div>', {
                    class: 'text-muted small px-2 py-2',
                    text: 'No matches'
                }).appendTo($list);
            }
        },

        getAllUniqueEmojis() {
            const data = this.getEmojiData();
            const out = [];
            const seen = new Set();

            Object.keys(data).forEach((key) => {
                const list = Array.isArray(data[key]) ? data[key] : [];
                list.forEach((item) => {
                    if (!item || typeof item.emoji !== 'string') return;
                    if (seen.has(item.emoji)) return;
                    seen.add(item.emoji);
                    out.push(item.emoji);
                });
            });

            this.getAsciiMap().forEach((item) => {
                if (!item || typeof item.emoji !== 'string') return;
                if (seen.has(item.emoji)) return;
                seen.add(item.emoji);
                out.push(item.emoji);
            });

            return out;
        },

        showDemo($wrapper, count = 100, time = 1000) {
            const uniqueEmojis = this.getAllUniqueEmojis();
            if (!uniqueEmojis.length) return;

            $wrapper.addClass('position-absolute overflow-hidden');

            let createdCount = 0;
            const interval = setInterval(() => {
                if (createdCount >= count) {
                    clearInterval(interval);
                    return;
                }

                const emoji = uniqueEmojis[Math.floor(Math.random() * uniqueEmojis.length)];
                const fontSize = Math.random() * 3 + 1;
                const fontSizePx = fontSize * 16;
                const wrapperWidth = $wrapper.width() || 0;
                const wrapperHeight = $wrapper.height() || 0;
                const top = Math.random() * Math.max(wrapperHeight - fontSizePx, 0) + fontSizePx / 2;
                const left = Math.random() * Math.max(wrapperWidth - fontSizePx, 0) + fontSizePx / 2;

                $('<span>', {
                    text: emoji,
                    class: 'emoji-demo',
                    css: {
                        zIndex: -1,
                        position: 'absolute',
                        fontSize: `${fontSize}rem`,
                        top: `${top}px`,
                        left: `${left}px`,
                        transform: `translate(-50%, -50%) rotate(${Math.random() * 60 - 30}deg)`
                    }
                }).appendTo($wrapper);

                createdCount += 1;
            }, time);
        },

        bindGlobalEvents() {
            if (this.globalEventsBound) return;

            $(document)
                .on('show.bs.dropdown', `.${DROPDOWN_CLASS}`, function () {
                    const $dropdown = $(this);
                    const $wrapper = $dropdown.closest(`.${WRAPPER_CLASS}`);
                    
                    if ($wrapper.length) {
                        pluginFunctions.fillDropdown($wrapper);
                    }

                    $dropdown.find('.dropdown-emoji-menu-wrapper').stop(true).animate({ scrollTop: 0 }, 150);
                    $dropdown.find('.js-emoji-search').val('');
                })
                .on('shown.bs.dropdown', `.${DROPDOWN_CLASS}`, function () {
                    $(this).find('.js-emoji-search').trigger('focus');
                    $(this).find('.dropdown-emoji-menu-wrapper').trigger('scroll');
                })
                .on('mousedown', `.${WRAPPER_CLASS} .dropdown-menu`, (e) => {
                    // This catches the mousedown before Bootstrap's dropdown-toggle listener
                    // which usually closes the menu on click/mousedown elsewhere.
                    const $target = $(e.target);
                    if ($target.closest('.js-emoji-tab-btn').length || $target.closest('.js-emoji-search').length) {
                        // e.preventDefault(); // Don't prevent default on search or it won't focus
                        e.stopPropagation();
                    }
                })
                .on('hide.bs.dropdown', `.${DROPDOWN_CLASS}`, (e) => {
                    if (this._keepOpen) {
                        e.preventDefault();
                        this._keepOpen = false;
                    }
                })
                .on('click', `.${WRAPPER_CLASS} .dropdown-menu`, (e) => {
                    // Prevent closing when clicking anywhere in the menu EXCEPT on emoji buttons
                    const $target = $(e.target);
                    // Use a more specific selector to identify emoji insert buttons
                    const isEmoji = $target.closest('.js-emoji-insert').length > 0;

                    if (!isEmoji) {
                        e.stopPropagation();
                    } else {
                        // If it is an emoji, ensure we don't prevent Bootstrap from closing the dropdown
                        this._keepOpen = false;
                        $(e.currentTarget).closest(`.${DROPDOWN_CLASS}`).dropdown('hide');
                    }
                })
                .on('mousedown click', `.js-emoji-tab-btn, .js-emoji-tab-btn i`, (e) => {
                    // Prevent any dropdown closing behavior from Bootstrap
                    this._keepOpen = true;
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation(); 

                    if (e.type === 'click') {
                        const $btn = $(e.currentTarget).closest('.js-emoji-tab-btn');
                        const $wrapper = $btn.closest(`.${WRAPPER_CLASS}`);
                        const tabKey = $btn.data('tab');
                        const $menuWrapper = $wrapper.find('.dropdown-emoji-menu-wrapper');
                        const $header = $wrapper.find(`.js-emoji-category-header[data-category="${tabKey}"]`);

                        if ($header.length) {
                            $wrapper.find('.js-emoji-tab-btn').removeClass('btn-light text-primary border-bottom border-primary').addClass('text-muted').css({
                                'border-bottom': '',
                                'background-color': '',
                                'position': '',
                                'z-index': ''
                            });
                            $btn.removeClass('text-muted').addClass('btn-light text-primary border-bottom border-primary').css({
                                'border-bottom': '2px solid var(--bs-primary)',
                                'background-color': 'rgba(var(--bs-primary-rgb), 0.1)',
                                'position': 'relative',
                                'z-index': '2'
                            });

                            const stickyNavHeight = $wrapper.find('.sticky-top').outerHeight() || 82;
                            const wrapperRect = $menuWrapper[0].getBoundingClientRect();
                            
                            const originalStyle = $header.attr('style') || '';
                            $header.css({ position: 'relative', top: '0' });
                            const realHeaderRect = $header[0].getBoundingClientRect();
                            $header.attr('style', originalStyle);

                            const headerOffsetTop = realHeaderRect.top - wrapperRect.top + $menuWrapper.scrollTop();

                            const targetScrollTop = headerOffsetTop - stickyNavHeight + 1;

                            $menuWrapper.stop(true).animate({
                                scrollTop: targetScrollTop
                            }, 200, () => {
                                // Force scroll trigger to update tabs immediately
                                $menuWrapper.trigger('scroll');
                            });
                        }
                    }
                })
                .on('input', `.${WRAPPER_CLASS} .js-emoji-search`, (e) => {
                    const $input = $(e.currentTarget);
                    const $wrapper = $input.closest(`.${WRAPPER_CLASS}`);
                    this.fillDropdown($wrapper, $input.val());
                })
                .on('input paste change', `.${LISTENER_CLASS}`, (e) => {
                    try {
                        this.emojifyTarget($(e.currentTarget));
                    } catch (err) {
                        console.error(err);
                    }
                })
                .on('click', `.${WRAPPER_CLASS} [data-emoji]`, (e) => {
                    e.preventDefault();

                    const $button = $(e.currentTarget);
                    const $wrapper = $button.closest(`.${WRAPPER_CLASS}`);
                    const settings = this.getSettings($wrapper);
                    if (!settings) return;

                    const emoji = String($button.data('emoji') || '');

                    // Update Recent Emojis
                    let recent = JSON.parse(localStorage.getItem('bs-emoji-picker-recent') || '[]');
                    
                    // Remove if already exists and move to front
                    const existingIndex = recent.indexOf(emoji);
                    if (existingIndex !== -1) {
                        recent.splice(existingIndex, 1);
                    }
                    recent.unshift(emoji);
                    recent = recent.slice(0, 20); // Keep last 20
                    localStorage.setItem('bs-emoji-picker-recent', JSON.stringify(recent));

                    // Invalidate caches to show updated recent list next time dropdown opens
                    this.invalidateCaches();

                    if (typeof settings.onClickEmoji === 'function') {
                        settings.onClickEmoji(emoji);
                    }

                    const $target = this.getTarget(settings);
                    if ($target.length) {
                        try {
                            this.insertEmojiAtCursor($target, emoji);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                });

            this.globalEventsBound = true;
        }
    };

    $.bsEmojiPicker.rebuildShortcodeMap = function () {
        pluginFunctions.invalidateCaches();
        return pluginFunctions.getShortcodeMap();
    };

    $.bsEmojiPicker.getShortcodeMap = function () {
        return $.extend({}, pluginFunctions.getShortcodeMap());
    };

    $.bsEmojiPicker.emojifyText = function (text) {
        return pluginFunctions.emojifyText(text);
    };

    $.bsEmojiPicker.emojify = function (input) {
        if (input == null) {
            throw new TypeError('Invalid input');
        }

        if (typeof input === 'string') {
            const trimmed = input.trim();

            const looksLikeHtml = /<[^>]+>/.test(trimmed);
            if (looksLikeHtml) {
                return pluginFunctions.emojifyHtml(input);
            }

            try {
                const $maybeDom = $(input);

                if ($maybeDom.length && (
                    trimmed.startsWith('.') ||
                    trimmed.startsWith('#') ||
                    trimmed.startsWith('[') ||
                    trimmed.includes(' ') ||
                    trimmed === 'body' ||
                    trimmed === 'html'
                )) {
                    return pluginFunctions.emojifyDom($maybeDom);
                }
            } catch (e) {
                // ignore selector parse errors
            }

            return pluginFunctions.emojifyText(input);
        }

        if (input.jquery) {
            return pluginFunctions.emojifyDom(input);
        }

        if (input instanceof Element || input === document || input === window) {
            return pluginFunctions.emojifyDom(input);
        }

        if (typeof input === 'object' && typeof input.length === 'number') {
            return pluginFunctions.emojifyDom(input);
        }

        throw new TypeError('Unsupported input type');
    };

    $.bsEmojiPicker.emojifyHtml = function (html) {
        return pluginFunctions.emojifyHtml(html);
    };

    $.bsEmojiPicker.emojifyDom = function (root) {
        return pluginFunctions.emojifyDom(root);
    };

    $.bsEmojiPicker.emojifyElement = function ($target) {
        return pluginFunctions.emojifyTarget($target);
    };

    $.bsEmojiPicker.isOnlyEmoji = function (text) {
        return pluginFunctions.isOnlyEmoji(text);
    };

    $.bsEmojiPicker.showDemo = function ($wrapper, count = 100, time = 1000) {
        return pluginFunctions.showDemo($wrapper, count, time);
    };

    $.fn.bsEmojiPicker = function (methodOrOptions, ...params) {
        if (!this.length) return this;

        if (typeof methodOrOptions === 'string') {
            const method = methodOrOptions;

            if (method === 'rebuild') {
                return this.each(function () {
                    const $wrapper = $(this);
                    const settings = pluginFunctions.getSettings($wrapper);
                    if (!settings) return;
                    pluginFunctions.buildDropdown($wrapper);
                });
            }

            if (method === 'search') {
                const query = params[0] || '';
                return this.each(function () {
                    const $wrapper = $(this);
                    pluginFunctions.fillDropdown($wrapper, query);
                });
            }

            if (typeof pluginFunctions[method] !== 'function') {
                throw new Error(`Unknown method "${method}"`);
            }

            const result = pluginFunctions[method](...params);
            return typeof result === 'undefined' ? this : result;
        }

        return this.each(function () {
            const $wrapper = $(this);
            let settings = pluginFunctions.getSettings($wrapper);

            if (!settings) {
                const options = typeof methodOrOptions === 'object' && methodOrOptions !== null
                    ? methodOrOptions
                    : {};

                settings = $.extend(true, {}, $.bsEmojiPicker.defaults, options);

                $wrapper.addClass(WRAPPER_CLASS);
                pluginFunctions.setSettings($wrapper, settings);
                pluginFunctions.buildDropdown($wrapper);
                pluginFunctions.bindGlobalEvents();

                const $target = pluginFunctions.getTarget(settings);
                if ($target.length) {
                    $target.addClass(LISTENER_CLASS);
                    try {
                        pluginFunctions.emojifyTarget($target);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        });
    };
}(jQuery));
