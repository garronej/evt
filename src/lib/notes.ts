
    /* 
    
    All possible cases====================

    matcher, boundTo, timeout, callback

    matcher, boundTo, timeout
    matcher, boundTo, callback
    matcher, timeout, callback
    boundTo, timeout, callback

    matcher, boundTo
    matcher, timeout
    matcher, callback
    boundTo, timeout
    boundTo, callback
    timeout, callback

    matcher
    callback
    boundTo
    timeout

    void

    matcher, timeout, evt

    matcher, evt
    timeout, evt

    evt


    matcher || callback => matcher 

    waitFor ( no callback, no boundTo ) =====================

    matcher, timeout

    matcher
    timeout

    void

    attach ( callback mandatory ) =====================

    matcher, boundTo, timeout, callback

    matcher, boundTo, callback
    matcher, timeout, callback
    boundTo, timeout, callback

    matcher, callback
    boundTo, callback
    timeout, callback

    callback

    matcher, timeout, evt

    matcher, evt
    timeout, evt

    evt

    */


    /*
    matcher, boundTo, timeout, callback
    matcher, boundTo, timeout
    matcher, boundTo, callback
    matcher, timeout, callback
    boundTo, timeout, callback
    matcher, boundTo
    matcher, timeout
    matcher, callback
    boundTo, timeout
    boundTo, callback
    timeout, callback
    matcher
    callback
    boundTo
    timeout
    void
    matcher, timeout, evt
    matcher, evt
    timeout, evt
    evt
    */